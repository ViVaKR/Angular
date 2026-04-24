import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../services/user-store';

/**
 * 특정 역할을 가진 사용자만 접근 가능
 * @example
 * path: 'admin',
 * canActivate: [authGuard, roleGuard],
 * data: { roles: ['Admin', 'Writer', 'User', 'Monk'] }
 */
export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const router = inject(Router);
  const userStore = inject(UserStore);

  // 🔹 2. 초기화 대기 (중요!)
  if (!userStore.isInitialized()) {
    return false;
  }

  // 🔹 3. 필수 역할 체크
  const userRoles = userStore.userRoles();
  const requiredRoles = route.data['roles'] as string[];

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // 🔹 4. 역할 검증
  const hasRole = userStore.hasAnyRole(requiredRoles);

  if (!hasRole) {
    console.log('🔒 Role Guard: 권한 부족', {
      required: requiredRoles,
      userRoles: userRoles
    });
    return router.createUrlTree(['/Home']);
  }
  console.log('✅ Role Guard: 권한 확인 완료', {
    required: requiredRoles,
    userRoles: userRoles
  });

  return true;
};
