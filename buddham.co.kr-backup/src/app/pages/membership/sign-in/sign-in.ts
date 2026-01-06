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

  readonly title = "로그인";

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
      filter(() => { // --> (1) 폼 유효성 검사
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return false;
        }
        return true;
      }),
      tap(() => this.loader.show()), // --> (2) 로딩 시작
      // --> switchMap : 이전 요청 취소, mergeMap : 다중 요청 허용
      exhaustMap(() =>  // --> (3) 사용자가 버튼을 광클을 해도, 요청이 진행 중이면 추가 클릭을 '무시' 함
        this.authService.signIn(this.form.getRawValue()).pipe(
          // 오류가 있어도 메인 스트림 (submit$) 이 죽지 않도록 내부에서 catch
          catchError((err: HttpErrorResponse) => {
            const msg: IBottomSheet[] = [
              {
                title: "오류발생",
                content: err.error?.message || err.message
              }
            ];
            this.alertService.openSheet(msg)
            return EMPTY; // 메인 스트림은 계속 살려둠
          }),
          finalize(() => this.loader.hide())
        )
      ),
      // (4) 성공시 처리
      tap(async (res) => {
        const data: IBottomSheet[] = [
          {
            title: `로그인 완료`,
            content: res.message
          }
        ];
        this.alertService.openSheet(data)
        await this.router.navigate([Paths.Home.url]);
      }),
      // (5) takeUntilDestroyed
      // 컴포넌트가 파괴되면 이 구독 스트림을 자동으로 끊어 줌
      // 생성자 컨텍스트 내부라서 인자 없이 사용 가능.
      takeUntilDestroyed()
    ).subscribe(); // 구독시작 (Unsubscribe 는 takeUntilDestroyed 가함)
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
