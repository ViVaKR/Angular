import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.getToken()) {

    // 복제 후 헤더에 토큰을 추가합니다.
    // 토큰이 있는 경우 요청을 복제하고 헤더에 토큰을 추가합니다.
    const token = authService.getToken();
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });

    // 복제된 요청을 전달합니다.
    return next(cloned).pipe(
      catchError((err: HttpErrorResponse) => {

        // 토큰이 만료되었을 때
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

        // 토큰이 만료되지 않았을 때
        return throwError(() => err);
      })
    );
  }

  // 토큰이 없는 경우 요청을 그대로 전달합니다.
  return next(req);
};
