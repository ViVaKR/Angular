import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const matSnackBar = inject(MatSnackBar);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  matSnackBar.open('You are not authorized to access this page', 'Close', {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  });

  route.data = { redirect: state.url };

  router.navigate(['/SignIn']);
  return false;
};
