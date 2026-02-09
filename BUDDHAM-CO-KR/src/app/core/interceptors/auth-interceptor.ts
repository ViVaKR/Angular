// auth-interceptor.ts
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from '@app/core/services/token-storage';
import { AuthService } from '@app/core/services/auth-service';
import { BehaviorSubject, catchError, defaultIfEmpty, filter, finalize, Observable, switchMap, take, throwError, timeout } from 'rxjs';

// 모듈 스코프: 동일 런타임 동안 refresh 상태 공유
let isRefreshing = false;

// refresh 결과를 대기 중인 요청들에게 전달
const refreshSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const tokenStorage = inject(TokenStorage);
  const router = inject(Router);
  const injector = inject(Injector);

  return authInterceptorCore(req, next, tokenStorage, injector, router);
};

function authInterceptorCore(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  tokenStorage: TokenStorage,
  injector: Injector,
  router: Router
): Observable<HttpEvent<unknown>> {

  const accessToken = tokenStorage.getAccessToken();

  const authReq = accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !isRefreshRequest(req)) {
        return handle401(authReq, next, tokenStorage, injector, router);
      }
      return throwError(() => err);
    })
  );
}

function isRefreshRequest(req: HttpRequest<unknown>): boolean {
  return req.url.endsWith('/Account/refresh-token');
}

function handle401(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  tokenStorage: TokenStorage,
  injector: Injector,
  router: Router
): Observable<HttpEvent<unknown>> {

  const authService = injector.get(AuthService);

  if (!isRefreshing) {
    isRefreshing = true;
    refreshSubject.next(null);

    return authService.refreshToken().pipe(
      defaultIfEmpty(null), // EMPTY를 null로 변환
      timeout(5_000), // 5초 타임아웃 (선택사항)
      switchMap(res => {
        // SSR 이거나 토큰 없음
        if (res === null || !res.isSuccess || !res.token) {
          tokenStorage.clear();
          router.navigate(['SignIn']);
          throw throwError(() => new Error('토큰 갱신에 실패!'))
        }

        // ✅ 토큰 갱신 성공
        tokenStorage.saveAccessToken(res.token);
        if (res.refreshToken) {
          tokenStorage.saveRefreshToken(res.refreshToken);
        }

        refreshSubject.next(res.token);

        return next(
          req.clone({
            setHeaders: { Authorization: `Bearer ${res?.token}` }
          }));
      }),

      catchError(err => {
        tokenStorage.clear();
        router.navigate(['/SignIn']);
        return throwError(() => err);
      }),
      finalize(() => {
        isRefreshing = false;
      })
    );
  } else {
    // 대기 중인 요청들은 최대 10초까지만 기다림
    return refreshSubject.pipe(
      filter(token => token !== null),
      take(1),
      timeout(10_000), // 10초 대기, 서택사항
      switchMap(token => {
        return next(
          req.clone({
            setHeaders: { Authorization: `Bearer ${token as string}` }
          }));
      }),
      catchError(() => {
        tokenStorage.clear();
        router.navigate(['/SignIn']);
        return throwError(() => new Error('토큰 갱신 대기 시간 초과'));
      })
    );
  }
}
