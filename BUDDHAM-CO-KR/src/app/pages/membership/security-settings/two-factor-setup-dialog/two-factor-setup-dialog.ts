import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ITwoFactorSetup } from '@app/core/interfaces/i-two-factor-setup';
import { AlertService } from '@app/core/services/alert-service';
import { AuthService } from '@app/core/services/auth-service';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-two-factor-setup-dialog',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './two-factor-setup-dialog.html',
  styleUrl: './two-factor-setup-dialog.scss',
})
export class TwoFactorSetupDialog {
  dialogRef = inject(MatDialogRef<TwoFactorSetupDialog>);
  authService = inject(AuthService);
  alertService = inject(AlertService);
  fb = inject(FormBuilder);

  step = signal(0);
  isLoading = signal(true);
  isVerifying = signal(false);
  setupData = signal<ITwoFactorSetup | null>(null);
  recoveryCodes = signal<string[]>([]);

  verifyForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  constructor() {
    // Step 1: QR 코드 생성 요청
    this.authService.enable2FA().pipe(
      tap(res => {
        this.setupData.set(res.rsData!);
        this.isLoading.set(false);
      }),
      catchError(err => {
        this.alertService.openSheet([{
          title: '오류',
          content: err.error?.message || '2FA 설정 중 오류가 발생했습니다.'
        }]);
        this.dialogRef.close({ success: false });
        return EMPTY;
      })
    ).subscribe();
  }

  // ✅ 다음 단계로
  nextStep() {
    this.step.update(v => v + 1);
  }

  // ✅ 이전 단계로
  prevStep() {
    this.step.update(v => v - 1);
  }

  verifyCode() {
    if (this.verifyForm.invalid) return;

    this.isVerifying.set(true);
    const code = this.verifyForm.value.code!;

    this.authService.verify2FA(code).pipe(
      tap(res => {
        this.recoveryCodes.set(res.rsData!.recoveryCodes);
        this.step.set(2); // Step 3로
        this.alertService.openSheet([{
          title: '성공',
          content: '2단계 인증이 활성화되었습니다!'
        }]);
      }),
      catchError(err => {
        this.alertService.openSheet([{
          title: '인증 실패',
          content: err.error?.message || '인증 코드가 올바르지 않습니다.'
        }]);
        this.verifyForm.patchValue({ code: '' });
        return EMPTY;
      }),
      finalize(() => this.isVerifying.set(false))
    ).subscribe();
  }

  downloadRecoveryCodes() {
    const blob = new Blob([this.recoveryCodes().join('\n')], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    a.download = `recovery-codes-${new Date().getTime()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  copyRecoveryCodes() {
    navigator.clipboard.writeText(this.recoveryCodes().join('\n'));
    this.alertService.openSheet([{
      title: '복사 완료',
      content: '복구 코드가 클립보드에 복사되었습니다.'
    }]);
  }

  complete() {
    this.dialogRef.close({ success: true });
  }
}
