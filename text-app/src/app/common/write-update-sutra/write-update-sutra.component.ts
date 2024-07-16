import { AfterContentChecked, afterNextRender, AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Injector, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
import { ScrollArrowComponent } from '@app/common/scroll-arrow/scroll-arrow.component';



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
    ScrollArrowComponent
  ],
  templateUrl: './write-update-sutra.component.html',
  styleUrl: './write-update-sutra.component.scss',
  providers: [
    { provide: 'LOCALE_ID', useValue: 'ko-KR' }
  ]
})
export class WriteUpdateSutraComponent implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {
  onMouseEnter($event: any) {
    $event.target.value = "";
  }


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

  rows = 100;
  rowArray = [5, 10, 15, 20, 25, 30, 40, 50, 100];
  onToggleChange($event: any) {
    console.log($event.value);

    this.rows = $event.value;

  }

  rowsClassB = "flex-grow border-none opacity-75 text-xs rounded-lg bg-red-500 hover:bg-sky-400 text-sky-400 hover:text-white";

  status: boolean = false;

  // onChangeRows($event: any) {
  //   $event.preventDefault();
  //   $event.target.classList = `${this.rowsClassB}`;
  // }

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

  constructor(
    private service: BuddhaService,
    public elementRef: ElementRef,
    public renderer: Renderer2,
    private cdredf: ChangeDetectorRef,
    private router: Router, private route: ActivatedRoute,
    public utility: Utility, private snackBar: MatSnackBar) {

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
    this.newForm("-");

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
          this.onReset();
        }, (error: any) => {
          this.openSnackBar('경전수정 오류 : ' + error, '오류발생');
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
    this.form.reset(this.form.value);
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  triggerResize() {
    afterNextRender(() => {
      this.autosize.resizeToFitContent(true);
    },
      {
        injector: this._injector,
      });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center'
    });
  }

  ngOnDestroy(): void {
    if (this.subtraSubscription) {
      this.subtraSubscription.unsubscribe();
    }
    if (this.utilitySubscription) {
      this.utilitySubscription.unsubscribe();
    }
    this.service.hideElement(false); // 프터 숨기기
  }
}
