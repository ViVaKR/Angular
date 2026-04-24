import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '@app/core/services/user-store';
import { filter, map, take, timeout, catchError } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

export const loadingGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  return toObservable(userStore.isInitialized).pipe(
    filter(initialized => {
      return initialized === true;
    }),
    take(1),
    timeout(1_000),
    map(() => {
      return true;
    }),
    catchError(() => {
      return of(router.createUrlTree(['/error'], {
        queryParams: { reason: 'initialization_timeout' }
      }));
    })
  );
};
