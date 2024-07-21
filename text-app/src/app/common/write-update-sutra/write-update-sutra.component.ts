import { AfterContentChecked, afterNextRender, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, Injector, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { JsonPipe, NgIf, NgFor, DatePipe, CurrencyPipe, registerLocaleData } from '@angular/common';
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

registerLocaleData(localeKo, 'ko');

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
    DatePipe,
    CurrencyPipe,
    BlankSpaceComponent
  ],
  templateUrl: './write-update-sutra.component.html',
  styleUrl: './write-update-sutra.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: 'LOCALE_ID', useValue: 'ko-KR' },
  ]
})
export class WriteUpdateSutraComponent implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {

  private _injector = inject(Injector);
  private fb = inject(FormBuilder);

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @Input() title = "경전 쓰기";
  @Input() section = 0; // 0: 쓰기, 1: 수정

  hangulArray = HangulOrderArray;
  form!: FormGroup;
  public v: number = 0;

  public fontOptions =
    (min: number, max: number) => [...Array(max - min + 1).keys()].map(i => `${i + min}px`);

  rows: number = 5;
  rowArray = [5, 10, 15, 20, 25, 30, 40, 50, 100, 300, 500, 1000];


  status: boolean = false;

  lineSpace = 1.5;
  cute = "'Cute Font', sans-serif";
  noto = "noto-sans-kr-normal";
  myClass = {
    'text-slate-400': true,
  }
  fontSize = "2em";

  // 구독
  subtraSubscription!: Subscription;
  utilitySubscription!: Subscription;

  authService = inject(AuthService);

  constructor(
    private service: BuddhaService,
    public elementRef: ElementRef,
    public renderer: Renderer2,
    private cdredf: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    public utility: Utility,
    private snackBar: MatSnackBar) {

    this.utilitySubscription = this.utility.value.subscribe((value: number) => {
      this.v = value ?? 0;
    });
  }
  ngAfterContentChecked(): void {
    this.cdredf.detectChanges();
  }

  ngAfterViewInit(): void {
    this.rows = 10;
    this.service.hideElement(true);
  }

  ngOnInit(): void {
    this.rows = 100;
    this.v = 0;
    this.newForm("");

    if (this.section == 1) {
      this.route.queryParams.subscribe({
        next: (params: any) => {
          const id = params['id'] as number;

          if (id === null || id === undefined) { this.form.controls['id'].setValue(1); }

          this.service.getScriptureById(id).subscribe({
            next: (data: any) => {
              if (data != null) {
                this.form.patchValue(data);
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

  newForm(val: string): void {
    this.form = this.fb.group({
      id: 0, // 글번호 (PK)
      title: [val, Validators.required], // 제목
      hangulOrder: [0, Validators.required], // 한글순서
      subtitle: [val], // 부제
      author: [val], // 저자
      translator: [val], // 번역자
      summary: [val], // 요약
      sutra: [val, Validators.required], // 경전
      originalText: [val], // 원문
      annotation: [val], // 주석
      created: [new Date()], // 작성일
      userId: [this.authService.getUserDetail()?.id ?? '-'], // 사용자 ID
      userName: [this.authService.getUserDetail()?.fullName ?? '-'] // 사용자 이름
    });
  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.openSnackBar('Please fill in the required fields', 'Error');
      return;
    }

    if (this.section == 0)
      this.subtraSubscription = this.service.postScripture(this.form.value)
        .subscribe((data: BuddistScripture) => {
          this.openSnackBar(`경전 ( ${data.id} ) 신규작성 완료하였습니다.`, '경전 신규 작성완료!');
          this.service.updated(true);
          this.service.updated(false);
        }, (error: any) => {
          this.openSnackBar('경전수정 오류 : ' + error, '오류발생');
          this.service.updated(false);
        });
    else if (this.section == 1)
      this.subtraSubscription = this.service.updateScripture(this.form.value.id, this.form.value).subscribe({
        next: (data: BuddistScripture) => {
          this.openSnackBar(`경전 ( ${data.id} ) 수정이 완료되었습니다.`, '경전 수정완료!');
          this.service.updated(true);
          this.service.updated(false);
        }, error: (error: any) => {
          this.openSnackBar('경전수정 오류: ' + error, '오류발생');
          this.service.updated(false);
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
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center'
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
    this.service.hideElement(false); // 푸터 (footer) 숨기기
  }
}
