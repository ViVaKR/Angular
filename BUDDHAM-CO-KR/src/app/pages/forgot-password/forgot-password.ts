import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@services/auth-service';
import { LoaderService } from '@services/loader-service';
import { AlertService } from '@services/alert-service';
import { catchError, EMPTY, exhaustMap, filter, finalize, Subject, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IBottomSheet } from '@app/core/interfaces/i-bottom-sheet';
import { IResponse } from '@app/core/interfaces/i-response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {

  title = '비밀번호 분실'
  private submit$ = new Subject<void>();
  origin = signal('');
  private formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    replyUrl: ['https://buddham.co.kr/ResetPassword', [Validators.required]]
  })

  constructor(private loader: LoaderService, private authService: AuthService, private alertService: AlertService) {
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
        this.authService.forgotPassword(this.form.getRawValue())
          .pipe(
            catchError((err: HttpErrorResponse) => {
              const msg: IBottomSheet[] = [
                {
                  title: '오류발생',
                  content: err.error?.message || err.message
                }
              ];

              this.alertService.openSheet(msg);
              return EMPTY
            }),
            finalize(() => this.loader.hide())
          )
      ),
      // 성공 처리
      tap(async (res: IResponse) => {
        const msg: IBottomSheet[] = [
          {
            title: '비밀번호 분실 신고 완료',
            content: res.rsMessage + "\n이메일을 확인하여 비밀번호 재설정 절차를 진행해주세요."
          }
        ]
        this.alertService.openSheet(msg);

      }),
      // 자동 구독 해제
      takeUntilDestroyed()
    ).subscribe();

    this.loader.hide();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.submit$.next();
  }
}
