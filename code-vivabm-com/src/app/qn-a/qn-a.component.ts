import { DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAvata } from '@app/interfaces/i-avata';
import { IQna } from '@app/interfaces/i-qna';
import { AuthService } from '@app/services/auth.service';
import { CodeService } from '@app/services/code.service';
import { FileManagerService } from '@app/services/file-manager.service';
import { QnaService } from '@app/services/qna.service';
import { HighlightAuto, Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-qn-a',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    JsonPipe,
    DatePipe,
    FormsModule,
    MatInputModule,
    HighlightAuto,
    Highlight,
    HighlightLineNumbers,
    NgIf,
    NgFor,
    MatButtonModule,
    MatCardModule,
    MatIconModule

  ],
  templateUrl: './qn-a.component.html',
  styleUrl: './qn-a.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, FormBuilder]
})
export class QnAComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  private _codeId: number;

  @Input() public get codeId() { return this._codeId; }
  public set codeId(value: number) {
    this.getQnaByCodeId();
    this._codeId = value;
  }

  @Input() qnas: WritableSignal<IQna[]> = signal([]);
  @Input() hideQna: boolean = true;

  fileManagerService = inject(FileManagerService);
  authSerivce = inject(AuthService);
  codeService = inject(CodeService);
  datePipe = inject(DatePipe);
  qnaService = inject(QnaService);
  snackBar = inject(MatSnackBar);
  fb = inject(FormBuilder);
  userId: WritableSignal<string> = signal('');
  defaultImage = '/login-icon.png';
  qnaSubscription: Subscription;
  userAvata: string = this.defaultImage;
  form!: FormGroup;
  qna: IQna;

  @ViewChild('qnaText') qnaText!: ElementRef;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      // 4개의 공백을 넣는다.
      switch (event.target) {
        case this.qnaText.nativeElement:
          this.indent(this.qnaText);
          break;
      }
    }
  }

  private indent(element: ElementRef) {
    const spaces = '    ';
    const start = element.nativeElement.selectionStart;
    const end = element.nativeElement.selectionEnd;
    const value = element.nativeElement.value;
    element.nativeElement.value = value.substring(0, start) + spaces + value.substring(end);
    element.nativeElement.selectionStart = element.nativeElement.selectionEnd = start + spaces.length;
  }

  writeQna() {
    this.form.reset();
    this.initForm();
    this.hideQna = !this.hideQna;
  }

  createImagePath(fileName: string | null | undefined) {
    return `${this.codeService.baseUrl}/images/${fileName}`;
  }

  newForm(userId: string, userName: string, qnaText: string, createDate: Date, myIp: string): void {
    this.form = this.fb.group<IQna>({
      id: 0,
      codeId: this.codeId,
      userId: userId,
      userName: userName,
      qnaText: qnaText,
      created: createDate,
      myIp: myIp
    });
  }

  initForm(): void {

    let ip = localStorage.getItem('publicIPAddress');
    let user = this.authSerivce.getUserDetail();
    this.userId.set(user?.id);
    let userName = user?.fullName;
    let date: Date = new Date();
    this.newForm(this.userId(), userName, '', date, ip);
  }

  avatas: IAvata[] = [];

  ngOnInit(): void {
    this.fileManagerService.getAvataList().subscribe({
      next: (avatas) => {
        this.avatas = avatas;
      }
    });

    this.qnaSubscription = this.qnaService.watchQna$.subscribe({
      next: (qnas) => {
        this.qnas.set(qnas);
      },
      error: (_) => {
        this.qnas.set([]);
      }
    });
    this.initForm();
  }

  getUserAvata(id: string): string | null | undefined {

    let avata = this.avatas.find((x) => x.userId === id);

    if (avata === undefined) return this.defaultImage;
    return avata.avataUrl;
  }

  ngAfterViewInit(): void {

  }

  getQnaByCodeId(): number {

    if (this.codeId === undefined || this.codeId <= 0) return 0;

    this.qnaSubscription = this.qnaService.getQnaByCodeId(this.codeId).subscribe({
      next: (response: IQna[]) => {
        this.qnas.set([]);
        if (response === null || response.length === 0) {
          return 0;
        };
        this.qnas.set(response);
        return this.qnas.length;
      },
      error: (_) => {
        this.qnas.set([]);
        return 0;
      }
    });
    return 0;
  }

  onSubmit() {
    let qna: IQna = this.form.value;
    this.qnaSubscription = this.qnaService.postQna(qna).subscribe({

      next: (response) => {
        this.snackBar.open(`QnA 등록 성공 ${response.id}`, '닫기', { duration: 3000 });
        this.form.reset();
        this.initForm();
        this.getQnaByCodeId();
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(`QnA 등록 실패 ${err.message}`, '닫기', { duration: 3000 });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // for (let prop in changes) {
    //   let change = changes[prop];
    //   let curVal = JSON.stringify(change.currentValue);
    //   let prevVal = JSON.stringify(change.previousValue);
    //   console.log(`${prop}: currentValue = ${curVal}, previousValue = ${prevVal}`);
    // }
  }

  resetForm() {
    this.form.reset();
    this.initForm();
  }

  deleteQna(id: number) {

    console.log(`deleteQna ${id}`);
    this.qnaSubscription = this.qnaService.deleteQnaById(id).subscribe({
      next: (_) => {
        this.snackBar.open(`QnA 삭제 성공`, '닫기', { duration: 3000 });
        this.getQnaByCodeId();
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(`QnA 삭제 실패 ${err.message}`, '닫기', { duration: 3000 });
      }
    });

  }

  ngOnDestroy(): void {
    if (this.qnaSubscription)
      this.qnaSubscription.unsubscribe();
  }
}

