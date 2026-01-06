import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthStore } from '@app/core/services/auth-store';
import { TokenStorage } from '../services/token-storage';
import { UserService } from '../services/user-service';
import { catchError, map, of, tap } from 'rxjs';
import { UserStore } from '../services/user-store';
import { BrowserService } from '../services/browser-service';

export const authGuard: CanActivateFn = (route, state): any => {

  const router = inject(Router);
  const authStore = inject(AuthStore);
  const userStore = inject(UserStore);
  const tokenStorage = inject(TokenStorage);
  const userService = inject(UserService);
  const browserSvc = inject(BrowserService);

  const returnUrl = state.url;

  if (!browserSvc.isBrowser) {
    console.log("Role ===> 브라우저가 아닙니다.");
    return;
  }

  if (authStore.isLoggedIn()) {
    if (!userStore.currentUser()) {
      return reloadUserInfo(userService, authStore, userStore, router, tokenStorage, state);
    }
    return
  }

  const token = tokenStorage.getAccessToken();

  if (token) {
    return reloadUserInfo(userService, authStore, userStore, router, tokenStorage, state);
  }

  return router.createUrlTree(['SignIn'], { queryParams: { returnUrl } });
};

function reloadUserInfo(
  userService: UserService,
  authStore: AuthStore,
  userStore: UserStore,
  router: Router,
  tokenStorage: TokenStorage,
  state: any
) {
  return userService.getMyInfo().pipe(
    tap(user => {
      console.log('👤 getMyInfo() 응답:', user);
      console.log('  - 사용자 역할:', user.roles);
    }),
    map(user => {
      authStore.setLogin(user);
      userStore.setUser(user);  // 👈 핵심!
      console.log('✅ authGuard: 두 스토어 업데이트 완료');
      return true;
    }),
    catchError((err) => {
      console.error('💥 authGuard 인증 실패:', err);
      tokenStorage.clear();
      authStore.clear();
      userStore.clearUser();

      const returnUrl = state.url;
      return of(router.createUrlTree(['/SignIn'], {
        queryParams: { returnUrl }
      }));
    })
  );
}
