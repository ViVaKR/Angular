import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthStore } from '@app/core/services/auth-store';
import { AuthService } from '@app/core/services/auth-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AsyncPipe } from '@angular/common';
import { IMenu } from '@app/core/interfaces/i-menu';
import { catchError, finalize, of } from 'rxjs';
import { RsCode } from '@app/core/enums/rs-code';
import { TokenStorage } from '@app/core/services/token-storage';
import { environment } from '@env/environment.development';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserStore } from '@app/core/services/user-store';
import { IUser } from '@app/core/interfaces/i-user';
import { IResponse } from '@app/core/interfaces/i-response';
import { AlertService } from '@app/core/services/alert-service';
import { IBottomSheet } from '@app/core/interfaces/i-bottom-sheet';
import { FileService } from '@app/core/services/file-service';
import { MenuService } from '@app/core/services/menu-service';

@Component({
  selector: 'app-menus',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    AsyncPipe
  ],
  templateUrl: './menus.html',
  styleUrl: './menus.scss',
})
export class Menus {

  private router = inject(Router);
  private tokenStorage = inject(TokenStorage);
  private authStore = inject(AuthStore);
  private authService = inject(AuthService);
  private userStore = inject(UserStore);
  private alertService = inject(AlertService);
  private fileService = inject(FileService);
  private menuService = inject(MenuService);

  baseUrl = environment.apiUrl;

  isLoggedIn$ = this.authStore.isLoggedIn$;
  isLoggedIn = toSignal(this.isLoggedIn$, { initialValue: false });

  currentUser = toSignal<IUser | null>(this.userStore.user$, { initialValue: null });

  defaultAvatar = `${this.baseUrl}/Images/buddha.png`;

  // #region 아바타 실시간 갱신
  // (1). 먼저 기본 아바타를 signal로
  private defaultAvatarSignal = computed(() => {
    const user = this.currentUser();
    if (user === null || user.avatar === 'default.png') {
      return this.defaultAvatar;
    }
    return `${this.baseUrl}/Images/avatars/${user.id}/${user.avatar}`;
  });

  // (2). 업데이트된 아바타를 signal로 변환
  private updatedAvatar = toSignal(this.fileService.avatarUpdated$, {
    initialValue: null
  });

  // (3). 두 signal을 합쳐서 최종 아바타 결정
  avatar = computed(() => {
    const updated = this.updatedAvatar();
    if (updated) {
      return `${this.baseUrl}${updated}`;
    }
    return this.defaultAvatarSignal();
  });
  // #endregion

  menus: IMenu[] = this.menuService.mainMenus();
  signInMenus = this.menuService.signInMenus();
  signOutMenus = this.menuService.signOutMenus();

  goTo = (url: string) => this.router.navigate([url]);

  signOut() {
    this.authService.signOut().pipe(
      catchError(err => {
        const msg: IBottomSheet[] = [
          {
            title: '로그아웃 중 오류',
            content: err
          }
        ];
        this.alertService.openSheet(msg);
        return of({ rsCode: RsCode.Error, rsMessage: '' } as IResponse);
      }),
      finalize(async () => {
        await this.clearToken();
      })
    ).subscribe(res => {
      if (res?.rsCode === RsCode.Ok) {
        const msg: IBottomSheet[] = [
          {
            title: `로그아웃 (${res.rsCode})`,
            content: res.rsMessage,
          }
        ];
        this.alertService.openSheet(msg);
      }
    });
  }

  async clearToken() {
    this.tokenStorage.clear();
    this.authStore.clear();

    // 홈으로 이동
    await this.router.navigate(['/Home']);
  }
}
