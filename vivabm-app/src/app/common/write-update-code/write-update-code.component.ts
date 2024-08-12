import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CurrencyPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
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
    PrintErrorComponent
  ],
  templateUrl: './write-update-code.component.html',
  styleUrl: './write-update-code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: 'LOCAL_ID', useValue: 'ko-KR' }
  ]
})
export class WriteUpdateCodeComponent implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {

  @Input() title: string = '';
  @Input() division: boolean = true; // true: 쓰기, false: 수정

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @ViewChild('code') code!: ElementRef;

  categories: ICategory[] = [];

  private fb = inject(FormBuilder);

  private _injector = inject(Injector);
  authService = inject(AuthService);
  codeService = inject(CodeService);
  categoryService = inject(CategoryService);

  elementRef = inject(ElementRef);
  cdredf = inject(ChangeDetectorRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  renderer = inject(Renderer2);
  snackbar = inject(MatSnackBar);

  isEmailConfirmed: boolean = false;
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

  today = new Date(Date.now());

  fontSize = "2em";

  codeSubscription!: Subscription;
  authSubscription!: Subscription;

  newForm(val: string): void {
    this.form = this.fb.group({
      id: 0,
      title: [val, Validators.required],
      content: [val, Validators.required],
      create: [new Date(Date.now())],
      note: [val],
      categoryId: [val],
    })
  }

  ngOnInit(): void {
    this.rows = 100;
    this.newForm('');
    if (this.division) {
      this.route.queryParams.subscribe({
        next: (params: any) => {
          const id = params['id'] as number;
          if (id === null || id === undefined) {
            this.form.controls['id'].setValue(1);
          }
        }
      })
    }
  }


  ngAfterViewInit(): void {
    this.rows = 10;
    this.categoryService.getCategories().subscribe({
      next: (result) => {
        this.categories = result;
      },
      error: (error) => {
        this.snackbar.open(`${error.error}`, '확인', {});
      }
    });
  }

  ngAfterContentChecked(): void {
    this.cdredf.detectChanges();
  }

  onSubmit(): void {

    this.isSpinner = true;

    if (this.form.invalid) {
      this.snackbar.open('입력값을 확인해 주세요.', '확인', {});
      this.isSpinner = false;
      return;
    }

    if (this.division) {
      this.codeSubscription = this.codeService.postCode(this.form.value).subscribe({
        next: (result) => {
          this.snackbar.open('저장되었습니다.', '확인', {});
          this.isSpinner = false;
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.snackbar.open(`${error.error}`, '확인', {});
          this.isSpinner = false;
        }
      })
    }
    else if (!this.division) {
      this.codeSubscription = this.codeService.updateCode(this.form.value).subscribe({
        next: (result) => {
          this.snackbar.open('수정되었습니다.', '확인', {});
          this.isSpinner = false;
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.snackbar.open(`${error.error}`, '확인', {});
          this.isSpinner = false;
        }
      })

    }
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

  onRest(): void {
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

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
