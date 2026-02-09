import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorStateMatcher } from '@app/core/classes/form-error-state-matcher';
import { IResponse } from '@app/core/interfaces/i-response';
import { AlertService } from '@app/core/services/alert-service';
import { AuthService } from '@app/core/services/auth-service';
import { LoaderService } from '@app/core/services/loader-service';
import { catchError, EMPTY, exhaustMap, filter, finalize, Subject, take, tap } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',

})
export class ResetPassword {

  title = '비밀번호 재설정';

  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private loader = inject(LoaderService);
  private alertService = inject(AlertService);
  readonly isSubmitting = signal(false);
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  matcher = new FormErrorStateMatcher();
  private formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    email: [{ value: '', disabled: true }],
    token: [{ value: '', disabled: true }],
    newPassword: ['', [Validators.required, Validators.minLength(8),]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  private email = toSignal(this.form.get('email')!.valueChanges, { initialValue: '' });
  private token = toSignal(this.form.get('token')!.valueChanges, { initialValue: '' });
  readonly submitError = signal<string | null>(null);
  private submit$ = new Subject<void>();

  constructor() {
    this.route.queryParamMap.pipe(
      take(1)  // ⬅️ 한 번만!
    ).subscribe(params => {
      const email = params.get('email') ?? '';
      const token = params.get('token') ?? '';

      if (email && token) {
        this.form.patchValue({
          email: decodeURIComponent(email),
          token: token
        });
      }
    });

    this.setupSubmitPipeline();
    this.loader.hide();
  }

  private setupSubmitPipeline() {
    this.submit$.pipe(
      filter(() => {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return false;
        }
        return true;
      }),
      tap(() => {
        this.isSubmitting.set(true);
        this.loader.show();
      }),
      exhaustMap(() =>
        this.authService.resetPassword({
          email: this.email(),
          token: this.token(),
          newPassword: this.form.get('newPassword')?.value
        }).pipe(
          catchError((err: HttpErrorResponse) => {
            this.submitError.set(err.error?.message || '비밀번호 재설정에 실패했습니다.');
            this.alertService.openSheet([{
              title: '오류 발생',
              content: this.submitError()!
            }]);
            return EMPTY;
          }),
          finalize(() => {
            this.isSubmitting.set(false);
            this.loader.hide();
          })
        )
      ),
      tap((res: IResponse) => {
        this.alertService.openSheet([{
          title: '비밀번호 재설정 완료',
          content: res.rsMessage || '새 비밀번호로 로그인해주세요.'
        }]);

        setTimeout(() => {
          this.router.navigate(['/SignIn']);
        }, 2000);
      }),
      takeUntilDestroyed()
    ).subscribe();
  }

  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    this.hidePassword.set(!this.hidePassword());
  }

  toggleConfirmPassword(event: MouseEvent) {
    event.preventDefault();
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
  }

  /* --- 오류 헬퍼 메서드 --- */
  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName);
    return !!(
      control &&
      control.hasError(error) &&
      (control.dirty || control.touched)
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submit$.next();
  }
}
