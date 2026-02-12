import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, switchMap, take, throwError, timeout } from 'rxjs';
import { AuthService } from '@app/core/services/auth-service';
import { TokenStorage } from '@app/core/services/token-storage';

let isRefreshing = false;
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

function isRefreshRequest(req: HttpRequest<any>) {
  return req.url.includes('/account/refresh-token');
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const tokenStorage = inject(TokenStorage);

  const accessToken = tokenStorage.getAccessToken();
  const clonedReq = accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(clonedReq).pipe(

    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !isRefreshRequest(req)) {

        // * 이미 갱신 중이면 대기
        if (isRefreshing) {
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            timeout(10_000),
            switchMap(token =>
              next(clonedReq.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
              }))
            )
          );
        }

        // * 갱신 시작
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.refreshToken().pipe(
          switchMap(res => {
            if (!res?.isSuccess || !res.token) {
              throw new Error('refresh failed');
            }
            refreshTokenSubject.next(res.token);
            return next(
              clonedReq.clone({
                setHeaders: { Authorization: `Bearer ${res.token}` }
              })
            );
          }),
          catchError(err => {
            refreshTokenSubject.error(err);
            refreshTokenSubject = new BehaviorSubject<string | null>(null);
            authService.logout();
            return throwError(() => err);
          }),
          finalize(() => {
            isRefreshing = false;
          })
        );
      }
      return throwError(() => err);
    })
  );
};
