import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RsCode } from '@app/core/enums/rs-code';
import { IBottomSheet } from '@app/core/interfaces/i-bottom-sheet';
import { IResponse } from '@app/core/interfaces/i-response';
import { AlertService } from '@app/core/services/alert-service';
import { AuthService } from '@app/core/services/auth-service';
import { AuthStore } from '@app/core/services/auth-store';
import { TokenStorage } from '@app/core/services/token-storage';
import { catchError, finalize, of } from 'rxjs';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-sign-out',
  imports: [
    MatButtonModule
  ],
  templateUrl: './sign-out.html',
  styleUrl: './sign-out.scss',
})
export class SignOut {

  private router = inject(Router);
  private tokenStorage = inject(TokenStorage);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);

  private authStore = inject(AuthStore);

  async signOut() {
    await this.authService.logout()
    // this.authService.signOut().pipe(
    //   catchError(err => {
    //     this.alertService.openSheet([{ title: '로그아웃 중 오류', content: err }]);
    //     return of({ rsCode: RsCode.Error, rsMessage: '' } as IResponse);
    //   }),
    //   finalize(async () => {
    //     await this.clearToken();
    //   })
    // ).subscribe(res => {
    //   if (res?.rsCode === RsCode.Ok) {
    //     const msg: IBottomSheet[] = [
    //       {
    //         title: `로그아웃 (${res.rsCode})`,
    //         content: res.rsMessage,
    //       }
    //     ];
    //     this.alertService.openSheet(msg);
    //   }
    // });
  }

  // async clearToken() {
  //   this.tokenStorage.clear();
  //   this.authStore.clear();
  //   await this.router.navigate(['/Home']);
  // }
}
