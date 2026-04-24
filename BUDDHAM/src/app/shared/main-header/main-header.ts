import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth-service';
import { AuthStore } from '@app/core/services/auth-store';
import { MenuService } from '@app/core/services/menu-service';
import { UserStore } from '@app/core/services/user-store';

@Component({
  selector: 'app-main-header',
  imports: [],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader {
  private readonly menuService = inject(MenuService);
  private readonly authStore = inject(AuthStore);
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);

  // 📊 상태
  readonly isLoggedIn = this.authStore.isLoggedIn;
  readonly currentUser = this.userStore.currentUser;
  readonly avatar = this.userStore.avatar;

  // 📋 메뉴들
  readonly mainMenus = this.menuService.mainMenus;
  readonly signInMenus = this.menuService.signInMenus;
  readonly signOutMenus = this.menuService.signOutMenus;

  goTo(url: string): void {
    this.menuService.navigateTo(url);
  }
}
