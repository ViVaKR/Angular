import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStore } from '@app/core/services/auth-store';
import { TokenStorage } from '../services/token-storage';
import { catchError, map, Observable, of, take } from 'rxjs';
import { UserStore } from '../services/user-store';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authStore = inject(AuthStore);
  const userStore = inject(UserStore);
  const authService = inject(AuthService);
  const tokenStorage = inject(TokenStorage);

  // 🔹 1. 초기화 대기
  if (!userStore.isInitialized()) {
    return of(router.createUrlTree(['/Home']));
  }

  // 🔹 1. 초기화 체크 (loadingGuard가 보장했으므로 간단 체크만)
  if (!userStore.isInitialized()) {
    return router.createUrlTree(['/error']);
  }

  // 🔹 2. 토큰 존재 여부 체크
  const token = tokenStorage.getAccessToken();
  if (!token) {
    return of(router.createUrlTree(['/SignIn'], {
      queryParams: { returnUrl: state.url }
    }));
  }

  // 🔹 3. 로그인 상태이지만 사용자 정보가 없는 경우 (토큰만 있고 유저 정보 없음)
  if (!userStore.user()) {
    return reloadUserInfo(authService, authStore, userStore, router, tokenStorage, state, route);
  }

  // 🔹 4. 이메일 인증 체크
  const requiresEmailConfirmed = route.data['requiresEmailConfirmed'] as boolean;
  if (requiresEmailConfirmed && !userStore.isEmailConfirmed()) {
    return of(router.createUrlTree(['/MemberShip/ConfirmEmail'], {
      queryParams: { returnUrl: state.url }
    }));
  }

  // 🔹 5. 역할(Role) 체크
  const requiredRoles = route.data['roles'] as string[];
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = userStore.hasAnyRole(requiredRoles);
    if (!hasRequiredRole) {
      return of(router.createUrlTree(['/Home']));
    }
  }
  return true;
};
// 🔹 사용자 정보 재로드 헬퍼 함수
function reloadUserInfo(
  authService: AuthService,
  authStore: AuthStore,
  userStore: UserStore,
  router: Router,
  tokenStorage: TokenStorage,
  state: RouterStateSnapshot,
  route: ActivatedRouteSnapshot
): Observable<boolean | import('@angular/router').UrlTree> {

  return authService.loadCurrentUser().pipe(
    take(1),
    map(user => {
      if (user == null) return false;
      authStore.setLogin(user);
      userStore.setUser(user);
      const requiredRoles = route.data['roles'] as string[];
      if (requiredRoles && requiredRoles.length > 0) {
        const hasRole = userStore.hasAnyRole(requiredRoles);
        if (!hasRole) {
          return router.createUrlTree(['/Home']);
        }
      }
      return true;
    }),
    catchError(() => {
      tokenStorage.clear();
      authStore.clear();
      userStore.clearUser();

      return of(router.createUrlTree(['/SignIn'], {
        queryParams: { returnUrl: state.url }
      }));
    })
  );
}
