import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.getToken()) {
    const token = authService.getToken();
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next(cloned).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          authService.refreshToken({
            email: authService.getUserDetail()?.email || "",
            token: authService.getToken() || "",
            refreshToken: authService.getRefreshToken() || ""

          }).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                localStorage.setItem('user', JSON.stringify(response));
                const cloned = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.token}`
                  }
                })
                location.reload();
              }
            },
            error: (error) => {
              authService.signOut();

              router.navigate(['/SignIn']);
              return throwError(() => error);
            },
          });
        }
        return throwError(() => err);
      })
    );
  }


  return next(req);
};
