import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/core/services/auth-service';
import { UserStore } from '@app/core/services/user-store';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { TwoFactorSetupDialog } from './two-factor-setup-dialog/two-factor-setup-dialog';
import { TwoFactorDisableDialog } from './two-factor-disable-dialog/two-factor-disable-dialog';
import { Router } from '@angular/router';
import { Paths } from '@app/data/menu-data';
import { AlertService } from '@app/core/services/alert-service';

@Component({
  selector: 'app-security-settings',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './security-settings.html',
  styleUrl: './security-settings.scss',
})
export class SecuritySettings {

  authService = inject(AuthService);
  userStore = inject(UserStore);
  router = inject(Router);
  dialog = inject(MatDialog);
  alertService = inject(AlertService);

  check = signal<boolean>(true);

  // ✅ computed로 변경 (더 안전)
  is2FAEnabled = computed(() => {
    return this.userStore.user()?.twoFactorEnabled ?? false;
  });

  openSetup2FA() {
    const dialogRef = this.dialog.open(TwoFactorSetupDialog, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        // ✅ 사용자 정보 새로고침 후 상태 확인
        this.authService.loadCurrentUser().subscribe(user => {
          this.alertService.openSheet([{
            title: `갱신된 사용자: ${user?.pseudonym}`,
            content: `2FA 상태: ${user?.twoFactorEnabled}`
          }])
        });
      }
    });
  }

  openDisable2FA() {
    const dialogRef = this.dialog.open(TwoFactorDisableDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.authService.loadCurrentUser().subscribe(user => {
          this.alertService.openSheet([{
            title: `갱신된 사용자: ${user?.pseudonym}`
          }])
        });
      }
    });
  }

  changePassword() {
    this.router.navigate([`/${Paths.MemberShip.url}/${Paths.ChangePassword.url}`]);
  }

}
