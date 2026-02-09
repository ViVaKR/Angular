import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AlertService } from '@app/core/services/alert-service';
import { AuthService } from '@app/core/services/auth-service';
import { LoaderService } from '@app/core/services/loader-service';
import { UserStore } from '@app/core/services/user-store';
import { catchError, EMPTY, exhaustMap, filter, finalize, from, Observable, Subject, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IChangePasswordRequest } from '@app/core/interfaces/i-change-password-request';
import { IResponse } from '@app/core/interfaces/i-response';
import { RsCode } from '@app/core/enums/rs-code';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {

  private fb = inject(FormBuilder);
  private loader = inject(LoaderService);
  private alertService = inject(AlertService);
  private authService = inject(AuthService);
  private userStore = inject(UserStore);
  private router = inject(Router);

  hidePassword = signal(true);
  isSubmiting = signal<boolean>(false);
  currentUser = this.userStore.currentUser;

  readonly form = this.createForm();
  public changePassword$ = new Subject<void>();
  constructor() {
    this.syncUserEmail();
    this.handlePasswordChange();
  }

  // 📝 폼 생성
  private createForm() {
    return this.fb.group({
      email: ['', Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  // 🔄 이메일 동기화
  private syncUserEmail(): void {
    effect(() => {
      const email = this.currentUser()?.email;
      if (email) {
        this.form.patchValue({ email }, { emitEvent: false });
      }
    })
  }

  // 🔐 비밀번호 변경 핸들러
  private handlePasswordChange(): void {

    this.changePassword$.pipe(
      filter(() => this.validateAndMarkForm()),
      tap(() => this.showLoader()),
      exhaustMap(() => this.changePassword()),
      takeUntilDestroyed()
    ).subscribe();
  }

  // ✅ 폼 검증
  private validateAndMarkForm(): boolean {
    if (this.form.valid) return true;
    this.form.markAllAsTouched();
    return false;
  }

  // 🔄 로더 표시
  private showLoader(): void {
    this.isSubmiting.set(true);
    this.loader.show();
  }

  // 🔐 비밀번호 변경 요청
  private changePassword() {
    const request = this.form.getRawValue() as IChangePasswordRequest;
    return from(this.authService.changePassword(request)).pipe(
      tap((res) => this.handleSuccess(res)),
      catchError((err) => this.handleError(err)),
      finalize(() => this.hideLoader())
    );
  }

  // ✅ 성공 핸들러
  private handleSuccess(res: IResponse): void {
    const isSuccess = res.rsCode === RsCode.Ok;

    this.showAlert(isSuccess ? ' 비밀번호 변경 완료' : '비밀번호 변경 실패', res.rsMessage);

    if (isSuccess) {
      this.authService.logout();
      this.router.navigate(['/SignIn']);
    }
  }

  // ❌ 에러 핸들러
  private handleError(err: any): Observable<never> {
    this.showAlert('에러 발생', err?.message ?? '비밀번호 변경 실패');
    return EMPTY;
  }

  // 🔄 로더 숨김
  private hideLoader(): void {
    this.isSubmiting.set(false);
    this.loader.hide();
  }

  // 📢 알림 표시
  private showAlert(title: string, content: string): void {
    this.alertService.openSheet([{ title, content }]);
  }

  resetForm() {
    this.form.reset({
      email: this.currentUser()?.email
    })
  }
  hasError(control: string, state: string) {
    const ctrl = this.form.get(control);
    return !!(ctrl?.hasError(state) && (ctrl.dirty || ctrl.touched));
  }

  togglePassword(event: Event) {
    event.preventDefault();
    this.hidePassword.update(value => !value);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.changePassword$.next();
  }
}
