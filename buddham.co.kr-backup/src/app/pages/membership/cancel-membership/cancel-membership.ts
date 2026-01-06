import { Component, inject, signal } from '@angular/core';
import { catchError, EMPTY, exhaustMap, filter, finalize, Subject, tap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '@services/alert-service';
import { LoaderService } from '@services/loader-service';
import { AuthService } from '@services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { IBottomSheet } from '@interfaces/i-bottom-sheet';
import { IResponse } from '@interfaces/i-response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { IValidationError } from '@interfaces/i-validation-error';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { UserStore } from '@services/user-store';

@Component({
  selector: 'app-cancel-membership',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule
  ],
  templateUrl: './cancel-membership.html',
  styleUrl: './cancel-membership.scss',
})
export class CancelMembership {

  readonly title = "회원탈퇴";

  private submit$ = new Subject<void>();

  private authService = inject(AuthService);
  private userService = inject(UserStore);

  private formBuilder = inject(FormBuilder);
  private alertService = inject(AlertService);
  private loader = inject(LoaderService);
  private router = inject(Router);

  hidePassword = signal(true);
  email = this.userService.currentUser;
  errors: IValidationError[] = [];

  form: FormGroup = this.formBuilder.group({
    email: [this.email()?.email, [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
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
      tap(() => {
        this.loader.show()
      }),
      exhaustMap(() =>
        this.authService.cancelAccount(this.form.getRawValue())
          .pipe(
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
      // 성공시 처리
      tap(async (res: IResponse) => {
        const msg: IBottomSheet[] = [
          {
            title: '회원탈퇴 완료',
            content: res.rsMessage
          }
        ];
        this.alertService.openSheet(msg);
        await this.authService.clearToken();
      }),
      takeUntilDestroyed()
    ).subscribe();
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName);
    return !!(
      control
      && control.hasError(error)
      && (control.dirty || control.touched)
    );
  }

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    this.hidePassword.update(v => !v);
  }

  onCancel = () => this.router

  onSubmit(event: Event) {
    event.preventDefault();
    this.submit$.next();
  }
}
