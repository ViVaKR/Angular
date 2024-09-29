import { DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    MatCardModule
  ],
  templateUrl: './qn-a.component.html',
  styleUrl: './qn-a.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, FormBuilder]
})
export class QnAComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
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
  userAvata: WritableSignal<string> = signal(this.defaultImage);
  form!: FormGroup;
  qna: IQna;

  @Input() qnas: WritableSignal<IQna[]> = signal([]);

  @Input() hideQna: boolean = true;

  writeQna() {
    this.form.reset();
    this.initForm();
    this.hideQna = !this.hideQna;
  }

  private _codeId: number;
  @Input() public get codeId() { return this._codeId; }
  public set codeId(value: number) {
    this.getQnaByCodeId();
    this._codeId = value;
  }

  getUserAvata(id: string) {
    this.fileManagerService.getUserImageById(id).subscribe({
      next: (avata) => {
        if (avata === null) return;
        this.userAvata.set(this.createImagePath(`${id}_${avata.dbPath}`));
      },
      error: (_) => { }
    });
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

  ngOnInit(): void {
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


  ngAfterViewInit(): void {
    this.getQnaByCodeId();
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
        if (this.codeId <= 0) return;
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

  ngOnDestroy(): void {
    if (this.qnaSubscription)
      this.qnaSubscription.unsubscribe();
  }
}

