import { AfterContentChecked, afterNextRender, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, Injector, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { JsonPipe, NgIf, NgFor, CurrencyPipe, registerLocaleData } from '@angular/common';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HangulOrderArray } from '@app/types/hangul-order';
import { Utility } from '@app/util/utility';
import { BuddhaService } from '@app/services/buddha.service';
import { BuddistScripture } from '@app/types/buddist-scripture';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { PrintErrorComponent } from "@app/common/print-error/print-error.component";
import { ActivatedRoute, Router } from '@angular/router';
import localeKo from '@angular/common/locales/ko';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { BlankSpaceComponent } from "../blank-space/blank-space.component";
import { AuthService } from '@app/services/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ScrollArrowComponent } from '@app/common/scroll-arrow/scroll-arrow.component';
import { HttpErrorResponse } from '@angular/common/http';
import { IResponse } from '@app/interfaces/i-response';

@Component({
  selector: 'app-write-update-sutra',
  standalone: true,
  imports: [
    AllMatModule,
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    NgFor,
    PrintErrorComponent,
    CurrencyPipe,
    BlankSpaceComponent,
    MatProgressSpinner,
    ScrollArrowComponent
  ],
  templateUrl: './write-update-sutra.component.html',
  styleUrl: './write-update-sutra.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WriteUpdateSutraComponent implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {

  private _injector = inject(Injector);
  private fb = inject(FormBuilder);
  form!: FormGroup;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @ViewChild('sutra') sutra!: ElementRef;

  @Input() title: string = '경전';
  @Input() section = 0; // 0: 쓰기, 1: 수정

  visibleSaveButton: boolean = true;

  hangulArray = HangulOrderArray;
  public v: number = 0;
  public fontOptions =
    (min: number, max: number) => [...Array(max - min + 1).keys()].map(i => `${i + min}px`);

  rows: number = 5;

  rowArray = [5, 10, 15, 20, 25, 30, 40, 50, 100, 300, 500, 1000];

  status: boolean = false;
  isSpinner: boolean = false;
  lineSpace = 1.5;
  cute = "'Cute Font', sans-serif";
  noto = "noto-sans-kr-normal";
  myClass = {
    'text-slate-400': true,
  }
  fontSize = "2em";
  authService = inject(AuthService);
  buddhaService = inject(BuddhaService);
  // 구독
  subtraSubscription!: Subscription;
  utilitySubscription!: Subscription;
  authSerbscription!: Subscription;

  newForm(val: string): void {
    this.form = this.fb.group({
      id: 0, // 글번호 (PK)
      title: [val, Validators.required], // 제목
      subtitle: [val], // 부제
      author: [val], // 저자
      translator: [val], // 번역자
      summary: [val], // 요약
      text: [val, Validators.required], // 경전
      originalText: [val], // 원문
      annotation: [val], // 주석
      hangulOrder: [0, Validators.required], // 한글순서
      created: [new Date()], // 작성일
      userId: [this.authService.getUserDetail()?.id ?? '-'], // 사용자 ID
      userName: [this.authService.getUserDetail()?.fullName ?? '-'] // 사용자 이름
    });
  }

  constructor(
    public elementRef: ElementRef,
    private cdredf: ChangeDetectorRef,
    private router: Router,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    public utility: Utility,
    private snackBar: MatSnackBar) {

    this.utilitySubscription = this.utility.value.subscribe((value: number) => {
      this.v = value ?? 0;
    });
  }

  isEmailConfirmed: boolean = false;

  ngOnInit(): void {
    this.rows = 100;
    this.v = 0;
    this.newForm("-");

    if (this.section == 1) {
      this.route.queryParams.subscribe({
        next: (params: any) => {
          const id = params['id'] as number;

          if (id === null || id === undefined) { this.form.controls['id'].setValue(1); }

          this.buddhaService.getScriptureById(id).subscribe({
            next: (res: IResponse) => {
              if (res.success) {
                this.form.patchValue(res.data);

                this.renderer.setProperty(this.sutra.nativeElement, 'selectionStart', res.data.text.length);
                this.renderer.setProperty(this.sutra.nativeElement, 'selectionEnd', res.data.text.length);
                this.renderer.setProperty(this.sutra.nativeElement, 'scrollTop', this.sutra.nativeElement.scrollHeight);
                // focus on the textarea
                this.sutra.nativeElement.focus();
                window.scrollTo(0, 0);

                // <textarea [(ngModel)]="..." #textarea [scrollTop]="textarea.scrollHeight"></textarea>
              }
            }, error: (error: any) => {
              this.openSnackBar('Error updating scripture: ' + error, 'Error');
            }
          });
        }, error: (error: any) => {
          this.openSnackBar('Error updating scripture: ' + error, 'Error');
        }
      });
    }
  }

  ngAfterViewInit(): void {

    this.rows = 10;
    this.buddhaService.hideElement(true);
    this.authSerbscription =
      this.authService.getDetail()?.subscribe({
        next: (result) => {
          this.isEmailConfirmed = result.emailConfirmed;
        },
        error: (error) => {
          this.isEmailConfirmed = false;
        }
      });
  }

  ngAfterContentChecked(): void {
    this.cdredf.detectChanges();
  }

  onSubmit(): void {
    this.isSpinner = true;

    if (this.form.invalid) {
      this.openSnackBar('Please fill in the required fields', 'Error');
      this.isSpinner = false;
      return;
    }

    switch (this.section) {
      case 0:
        this.doSave();
        break;
      case 1:
        this.doUpdate();
        break;
    }

  }

  /// 신규작성 (경전)
  doSave() {
    this.subtraSubscription = this.buddhaService.postScripture(this.form.value)
      .subscribe({
        next: (res: IResponse) => {
          if (res.success) {
            this.openSnackBar(`경전 ( ${res.data.id} ) 작성이 완료되었습니다.`, '닫기');
            this.buddhaService.updated(true);
            this.isSpinner = false;

            this.router.navigate(['Buddha/BuddhistScriptureRead'], { queryParams: { id: res.data.id } });
          }
          else {
            this.openSnackBar('경전 작성 오류: ' + res.message, '오류');
            this.buddhaService.updated(false);
            this.isSpinner = false;
          }

        }, error: (error: IResponse) => {
          this.openSnackBar('경전 작성 오류: ' + error.message, '오류');
          this.buddhaService.updated(false);
          this.isSpinner = false;
        }
      });
  }

  ///--> 수정 (경전)
  doUpdate() {
    this.subtraSubscription = this.buddhaService.updateScripture(this.form.value.id, this.form.value).subscribe({
      next: (res: IResponse) => {
        this.buddhaService.updated(true);
        this.openSnackBar(`경전 ( ${res.data.id} ) 수정이 완료되었습니다.`, '닫기');
        this.buddhaService.updated(false);
        this.isSpinner = false;
        this.router.navigate(['Buddha/BuddhistScriptureRead'], { queryParams: { id: res.data.id } });
      }, error: (error: IResponse) => {
        this.openSnackBar('경전수정 오류: ' + error.message, '오류발생');
        this.buddhaService.updated(false);
        this.isSpinner = false;
      }
    });
  }

  onReset(): void {
    this.form.reset();
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  triggerResize() { // font resize : 텍스트 영역 자동 크기 조정
    afterNextRender(() => {
      this.autosize.resizeToFitContent(true);
    }, {
      injector: this._injector,
    });
  }

  openSnackBar(message: string, action: string): void {
    this.isSpinner = false;
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onToggleChange($event: any) {
    this.rows = $event.value;
  }

  ngOnDestroy(): void {
    if (this.subtraSubscription) {
      this.subtraSubscription.unsubscribe();
    }
    if (this.utilitySubscription) {
      this.utilitySubscription.unsubscribe();
    }
    this.buddhaService.hideElement(false); // 푸터 (footer) 숨기기

    if (this.authSerbscription) {
      this.authSerbscription.unsubscribe();
    }
  }
}
