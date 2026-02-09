import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertService } from '../services/alert-service';
import { IBottomSheet } from '../interfaces/i-bottom-sheet';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {

  const alertService = inject(AlertService);
  let msg: IBottomSheet[];

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      switch (error.status) {
        // 1️⃣ 네트워크 오류
        case 0: {
          msg = [{ title: '네트워크 오류', content: '서버에 연결할 수 없습니다.' }];
        } break;

        // 인증 만료
        case 401: {
          msg = [{ title: '로그인이 만료되었습니다. (401)', content: '로그인이 만료되었습니다.' }];
        } break;

        // 권한 없음
        case 403: {
          msg = [{ title: '권한 없음 (403)', content: '접근 권한이 없습니다.' }];
        } break;

        // 서버 에러
        case 500: {
          msg = [{ title: '서버 에러 (500)', content: '서버 오류가 발생했습니다.' }];
        } break;

        default: {
          msg = [{ title: '비즈니스 에러', content: '요청 처리 중 오류가 발생했습니다.' }];
        } break;
      }
      alertService.openSheet(msg);

      // ❗ 다시 던진다 (매우 중요함)
      return throwError(() => error);
    })
  );
};
/*
요청 → 401 발생
   ↓
Refresh Token 요청 (1번만)
   ↓
성공 → 새 Access Token 저장
   ↓
원래 요청 다시 실행


*/
