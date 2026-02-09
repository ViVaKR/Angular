import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBottomSheet } from '@app/core/interfaces/i-bottom-sheet';
import { AlertService } from '@app/core/services/alert-service';
import { AuthService } from '@app/core/services/auth-service';
import { LoaderService } from '@app/core/services/loader-service';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { catchError, EMPTY, exhaustMap, filter, finalize, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-two-factor-verify',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './two-factor-verify.html',
  styleUrl: './two-factor-verify.scss',
})
export class TwoFactorVerify {

  readonly title = Paths.TwoFactorVerify.title;

  private submit$ = new Subject<void>();
  private submitRecovery$ = new Subject<void>();

  authService = inject(AuthService);
  userStore = inject(UserStore);
  alertService = inject(AlertService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  loader = inject(LoaderService);

  userEmail = signal<string>('');

  // 복구 코드 모드 여부
  isRecoveryMode = signal<boolean>(false);

  form: FormGroup = this.formBuilder.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    rememberMe: [false]
  });

  recoveryForm: FormGroup = this.formBuilder.group({
    recoveryCode: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor() {

    const nav = this.router.currentNavigation();
    const email = nav?.extras.state?.['email'];

    this.userEmail.set(email);
    this.loader.hide();

    // ! 일반 2FA 코드 제출
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
        this.authService.signInWith2FA(email, this.form.value.code, this.form.value.rememberMe)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              const msg: IBottomSheet[] = [{
                title: '인증 실패',
                content: err.error?.message || err.message || '인증 코드가 올바르지 않습니다.'
              }];
              this.alertService.openSheet(msg)
              this.form.patchValue({ code: '' }); // 코드 초기화
              return EMPTY;
            }),
            finalize(() => this.loader.hide())
          )
      ),
      tap(async (res) => {
        // ✅ 로그인 성공 시 sessionStorage 정리
        sessionStorage.removeItem('2fa-email');

        const data: IBottomSheet[] = [{
          title: "로그인 완료",
          content: res.message || '2단계 인증에 성공했습니다.'
        }];
        this.alertService.openSheet(data);
        await this.router.navigate([Paths.Home.url]);
      }),
      takeUntilDestroyed()
    ).subscribe();

    // 복구 코드 제출
    this.submitRecovery$.pipe(
      filter(() => {
        if (this.recoveryForm.invalid) {
          this.recoveryForm.markAllAsTouched();
          return false;
        }
        return true;
      }),
      tap(() => this.loader.show()),
      exhaustMap(() =>
        this.authService.signInWithRecoveryCode(email, this.recoveryForm.value.recoveryCode)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              const msg: IBottomSheet[] = [{
                title: '복구 코드 인증 실패',
                content: err.error?.message || err.message || '복구 코드가 올바르지 않습니다.'
              }];
              this.alertService.openSheet(msg)
              this.recoveryForm.patchValue({ recoveryCode: '' });
              return EMPTY;
            }),
            finalize(() => this.loader.hide())
          )
      ),
      tap(async (res) => {
        sessionStorage.removeItem('2fa-email');
        const data: IBottomSheet[] = [{
          title: "로그인 완료",
          content: res.message || '복구 코드로 로그인에 성공했습니다.'
        }];
        this.alertService.openSheet(data);
        await this.router.navigate([Paths.Home.url]);
      }),
      takeUntilDestroyed()
    ).subscribe();
  }


  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName);
    return !!(
      control &&
      control.hasError(error) &&
      (control.dirty || control.touched)
    );
  }
  hasRecoveryError(controlName: string, error: string): boolean {
    const control = this.recoveryForm.get(controlName);
    return !!(
      control &&
      control.hasError(error) &&
      (control.dirty || control.touched)
    );
  }

  toggleRecoveryMode() {
    this.isRecoveryMode.update(v => !v);
    // 폼 초기화
    this.form.reset({ code: '', rememberMe: false });
    this.recoveryForm.reset({ recoveryCode: '' });
  }

  goBack() {
    // ✅ 뒤로가기 시 sessionStorage 정리
    sessionStorage.removeItem('2fa-email');
    this.router.navigate(['/MemberShip/SignIn']);
  }

  onRecoverySubmit(event: Event) {
    event.preventDefault();
    this.submitRecovery$.next();
  }
  onSubmit(event: Event) {
    event.preventDefault();
    this.submit$.next();
  }
}
