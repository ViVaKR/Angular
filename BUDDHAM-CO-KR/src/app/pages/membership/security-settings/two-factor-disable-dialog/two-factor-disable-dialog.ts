import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@app/core/services/alert-service';
import { AuthService } from '@app/core/services/auth-service';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-two-factor-disable-dialog',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './two-factor-disable-dialog.html',
  styleUrl: './two-factor-disable-dialog.scss',
})
export class TwoFactorDisableDialog {
  dialogRef = inject(MatDialogRef<TwoFactorDisableDialog>);
  authService = inject(AuthService);
  alertService = inject(AlertService);

  cancel() {
    this.dialogRef.close({ success: false });
  }

  confirm() {
    this.authService.disable2FA().pipe(
      tap(() => {
        this.alertService.openSheet([{
          title: '완료',
          content: '2단계 인증이 해제되었습니다.'
        }]);
        this.dialogRef.close({ success: true });
      }),
      catchError(err => {
        this.alertService.openSheet([{
          title: '오류',
          content: err.error?.message || '2FA 해제 중 오류가 발생했습니다.'
        }]);
        return EMPTY;
      })
    ).subscribe();
  }
}
