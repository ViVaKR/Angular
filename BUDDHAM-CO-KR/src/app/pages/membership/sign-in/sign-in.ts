import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@app/core/services/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from '@app/core/services/loader-service';
import { Router } from '@angular/router';
import { catchError, EMPTY, exhaustMap, filter, finalize, Subject, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IValidationError } from '@app/core/interfaces/i-validation-error';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Paths } from '@app/data/menu-data';
import { IBottomSheet } from '@app/core/interfaces/i-bottom-sheet';
import { AlertService } from '@app/core/services/alert-service';

@Component({
  selector: 'app-sign-in',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormField,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SignIn {

  readonly title = Paths.SignIn.title;

  private submit$ = new Subject<void>();

  authService = inject(AuthService);
  alertService = inject(AlertService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  loader = inject(LoaderService);

  hidePassword = signal(true);
  errors: IValidationError[] = [];

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    this.loader.hide();
    this.submit$.pipe(
      filter(() => {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return false;
        }
        return true;
      }),
      tap(() => this.loader.show()),
      exhaustMap(() =>
        this.authService.signIn(this.form.getRawValue()).pipe(
          catchError((err: HttpErrorResponse) => {
            const msg: IBottomSheet[] = [
              {
                title: "오류발생",
                content: err.error?.message || err.message
              }
            ];
            this.alertService.openSheet(msg)
            return EMPTY;
          }),
          finalize(() => this.loader.hide())
        )
      ),
      // (4) 성공시 처리
      tap(async (res) => {
        if (res.requiresTwoFactor) {
          await this.router.navigate(['TwoFactorVerify'], {
            state: { email: this.form.getRawValue().email }
          });
          return;
        }

        // 일반 로그인 성공
        const data: IBottomSheet[] = [
          {
            title: `로그인 완료`,
            content: res.message
          }
        ];
        this.alertService.openSheet(data)
        await this.router.navigate([Paths.Home.url]);
      }),
      takeUntilDestroyed()
    ).subscribe();
  }

  /* 오류 헬퍼 메서드 */
  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName);
    return !!(
      control &&
      control.hasError(error) &&
      (control.dirty || control.touched)
    );
  }

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    this.hidePassword.update(v => !v);
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    this.submit$.next();
  }
}
