import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../services/user-store';

export const emailConfirmedGuard: CanActivateFn = (route, state) => {

  const userStore = inject(UserStore);
  const router = inject(Router);

  const isConfirmed = userStore.isEmailConfirmed();

  if (!isConfirmed) {
    console.log('❌ emailConfirmedGuard: 이메일 인증 필요');
    return router.createUrlTree(['/MemberShip/ConfirmEmail']);
  }
  console.log('✅ emailConfirmedGuard: 이메일 인증 완료');
  return true;
};
