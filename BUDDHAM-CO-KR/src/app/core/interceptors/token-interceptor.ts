import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '@app/core/services/auth-service';
import { TokenStorage } from '@app/core/services/token-storage';

let isRefreshing = false;
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const tokenStorage = inject(TokenStorage);
  const accessToken = tokenStorage.getAccessToken();
  const clonedReq = accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(clonedReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !req.url.includes('/refresh')) {

        // * 이미 갱신 중이면 대기
        if (isRefreshing) {
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token => {
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
              });
              return next(retryReq);
            })
          );
        }

        // * 갱신 시작
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.refreshToken().pipe(
          switchMap((res) => {
            if (res?.isSuccess) {
              isRefreshing = false;
              refreshTokenSubject.next(res.token);

              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${res.token}` }
              });
              return next(retryReq);
            }
            isRefreshing = false;
            authService.signOut();
            // router.navigate(['Home']);
            return throwError(() => err);
          }),
          catchError((refreshErr) => {
            isRefreshing = false;
            authService.signOut();
            // router.navigate(['Home']);
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
