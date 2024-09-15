import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const roles = route.data['roles'] as string[];
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  const router = inject(Router);
  const userRoles = authService.getRoles();

  if (!authService.isLoggedIn()) {
    const ref = snackBar.open('로그인이 필요합니다.', '확인', {
      duration: 3000,
    });

    ref.afterDismissed().subscribe(() => {
      router.navigate(['/SignIn']);
    });

    return false;
  }

  if (!roles.some(role => userRoles?.includes(role))) {

    const ref = snackBar.open('권한이 없습니다.', '확인', {
      duration: 3000,
    });

    ref.afterDismissed().subscribe(() => {
      router.navigate(['/']);
    });

    return false;
  }
  return true;
};
