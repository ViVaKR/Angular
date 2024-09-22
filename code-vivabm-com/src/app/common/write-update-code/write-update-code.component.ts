import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CurrencyPipe, DatePipe, JsonPipe, NgFor, NgIf, registerLocaleData } from '@angular/common';
import { AfterContentChecked, afterNextRender, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, Injector, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { CodeService } from '@app/services/code.service';
import { Subscription } from 'rxjs';
import { PrintErrorComponent } from '../print-error/print-error.component';
import { CategoryService } from '@app/services/category.service';
import { ICategory } from '@app/interfaces/i-category';
import { MatInputModule } from '@angular/material/input';
import { ICodeResponse } from '@app/interfaces/i-code-response';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { BlankSpaceComponent } from "../blank-space/blank-space.component";
import localeKo from '@angular/common/locales/ko';
import { ICode } from '@app/interfaces/i-code';
import { ScrollArrowComponent } from '../scroll-arrow/scroll-arrow.component';

registerLocaleData(localeKo, 'ko');

@Component({
  selector: 'app-write-update-code',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    NgFor,
    DatePipe,
    CurrencyPipe,
    MatProgressSpinner,
    FormsModule,
    MatCardModule,
    MatCardHeader,
    MatFormFieldModule,
    MatInputModule,
    MatFormField,
    MatSelectModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatButtonModule,
    PrintErrorComponent,
    BlankSpaceComponent,
    ScrollArrowComponent
  ],
  templateUrl: './write-update-code.component.html',
  styleUrl: './write-update-code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePipe,
    { provide: 'LOCALE_ID', useValue: 'ko-KR' }
  ]
})
export class WriteUpdateCodeComponent implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {

  @Input() title: string = '';
  @Input() division: boolean = true; // true: 쓰기, false: 수정

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @ViewChild('code') code!: ElementRef;

  categories: ICategory[] = [];

  fb = inject(FormBuilder);
  _injector = inject(Injector);
  authService = inject(AuthService);
  codeService = inject(CodeService);
  categoryService = inject(CategoryService);
  elementRef = inject(ElementRef);
  cdredf = inject(ChangeDetectorRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  renderer = inject(Renderer2);
  snackbar = inject(MatSnackBar);

  today!: string | null;
  isEmailConfirmed: boolean = false;
  visibleSaveButton: boolean = true;

  form!: FormGroup;

  public fontOptions = (min: number, max: number) => [...Array(max - min + 1).keys()].map(i => `${i + min}px`);

  rows: number = 5;
  rowArray = [5, 10, 15, 20, 25, 30, 40, 50, 100, 300, 500, 1000];

  status: boolean = false;

  isSpinner: boolean = false;

  lineSpace = 1.5;

  myClass = {
    'text-slate-400': true
  }

  fontSize = "2em";

  codeSubscription!: Subscription;
  authSubscription!: Subscription;

  newForm(val: string): void {
    this.form = this.fb.group({
      id: 0,
      title: [val, Validators.required],
      subTitle: [val, Validators.required],
      content: [val, Validators.required],
      created: [null],
      modified: [new Date()],
      note: [val],
      categoryId: [1],
      userId: [val],
      userName: [val],
      myIp: [val]
    });
  }

  constructor(private datePipe: DatePipe) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  tempData!: ICode;

  userId: string = '';
  userName: string = '';
  myIp: string = '0.0.0.0';

  ngOnInit(): void {

    this.rows = 100;

    this.userId = this.authService.getUserDetail().id;
    this.userName = this.authService.getUserDetail().fullName;

    if (this.authService.isLoggedIn() && (this.userId === null || this.userId === undefined)) {
      this.snackbar.open('로그인이 필요합니다.', '확인');
      this.router.navigate(['/login']);
      return;
    }

    this.newForm('');

    this.form.controls['userId'].setValue(this.userId);
    this.form.controls['userName'].setValue(this.userName);

    this.codeService.publicIPAddress.subscribe(x => this.myIp = x);
    this.form.controls['myIp'].setValue(this.myIp);

    if (!this.division) { // 수정
      this.route.queryParams.subscribe({
        next: (params: any) => {

          const id = params['id'] as number;
          if (id === null || id === undefined)
            this.form.controls['id'].setValue(1);

          this.codeService.getCodeById(id).subscribe({
            next: (data: any) => {
              if (data != null) {
                this.tempData = data;
                this.form.patchValue(data);
                this.codeService.publicIPAddress.subscribe(x => this.myIp = x);
                this.form.controls['myIp'].setValue(this.myIp);
              }
            },
            error: (error: HttpErrorResponse) => {
              this.snackbar.open(`${error.message}`, '닫기');
            }
          });
        }
      });
    }
  }


  onSubmit(): void {

    this.form.controls['userId'].setValue(this.userId);
    this.form.controls['userName'].setValue(this.userName);
    this.isSpinner = true;

    if (this.form.invalid) {
      this.snackbar.open('입력값을 확인해 주세요.', '닫기');
      this.isSpinner = false;
      return;
    }

    if (this.division) { // 쓰기
      this.codeSubscription = this.codeService.postCode(this.form.value).subscribe({

        next: (response: ICodeResponse) => {
          this.isSpinner = false;
          this.codeService.updated(true);
          this.snackbar.open(`(${response.isSuccess} ${response.message}) ${response.data}`, '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.codeService.updated(false);
        },
        error: (error) => {
          this.isSpinner = false;
          this.snackbar.open(`Error: ${error.message}`, '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.codeService.updated(false);
        }
      });
    }
    else if (!this.division) { // 수정
      this.codeSubscription = this.codeService.updateCode(this.form.value.id, this.form.value).subscribe({
        next: (data: ICodeResponse) => {
          this.isSpinner = false;

          if (data.isSuccess) {
            this.codeService.updated(true);

            this.snackbar.open(`수정완료: ${data.message}`, '닫기');
            this.codeService.updated(false);
          } else {
            this.snackbar.open(`데이터 수정 실패: ${data.message}`, '닫기');
            this.codeService.updated(false);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.isSpinner = false;

          this.snackbar.open(`${error.message}`, '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });

    }
  }

  ngAfterViewInit(): void {

    this.rows = 10;
    this.categoryService.getCategories().subscribe({
      next: (result) => {
        this.categories = result;
      },
      error: (error) => {
        this.snackbar.open(`${error.message}`, '확인', {});
      }
    });
  }

  ngAfterContentChecked(): void {
    this.cdredf.detectChanges();
  }

  selectedCategory(target: any) {
    this.form.controls['categoryId'].setValue(target.value);
  }

  onToggleChange($event: MatButtonToggleChange) {
    this.rows = $event.value;
  }

  triggerResize() {
    afterNextRender(() => {
      this.autosize.resizeToFitContent(true);
    }, {
      injector: this._injector
    });
  }

  onReset(): void {
    this.form.reset();
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if (this.codeSubscription) {
      this.codeSubscription.unsubscribe();
    }

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
