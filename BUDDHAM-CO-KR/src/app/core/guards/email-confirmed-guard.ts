import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../services/user-store';

export const emailConfirmedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userStore = inject(UserStore);

  if (!userStore.isEmailConfirmed()) {
    return router.createUrlTree(['/verify-email'], {
      queryParams: { returnUrl: state.url }
    });
  }

  return true;
};
