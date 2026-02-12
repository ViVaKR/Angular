import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertService } from '../services/alert-service';
import { IBottomSheet } from '../interfaces/i-bottom-sheet';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { environment } from '@env/environment.development';

export const httpErrorInterceptor: HttpInterceptorFn = (
  req,
  next
): Observable<HttpEvent<any>> => {

  const alertService = inject(AlertService);
  const router = inject(Router);
  const authService = inject(AuthService);

  let msg: IBottomSheet[];

  // 🎯 에러 알림을 건너뛸 URL 패턴
  // const silentUrls = [
  //   '/auth/refresh',
  //   '/health-check',
  //   '/api/ping'
  // ];
  // const shouldSkip = silentUrls.some(url => req.url.includes(url));

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // if (shouldSkip) { }

      switch (error.status) {

        // ========== 🌐 네트워크 오류 ==========
        case 0: {
          msg = [{ title: '네트워크 오류', content: '인터넷 연결을 확인해주세요' }];
        } break;

        // ========== 🔒 인증 오류 ==========
        case 401: {
          msg = [{ title: '인증 만료', content: '다시 로그인하여 주세요' }];

          // 자동 로그아웃 & 로그인 페이지 이동 (선택)
          authService.logout();
          router.navigate(['/SignIn']);
        } break;

        // ========== 🚫 권한 오류 ==========
        case 403: {
          msg = [{ title: '접근 거부', content: '이 기능에 접근할 권한이 없습니다.' }];
        } break;

        // ========== ❌ 요청 오류 (400번대) ==========
        case 400: {
          // 🎯 ASP.NET Core Validation 에러 파싱
          msg = parseValidationError(error);
        } break;

        case 404: {
          msg = [{
            title: '찾을 수 없음',
            content: '요청한 리소스를 찾을 수 없습니다.'
          }]
        } break;

        case 409: {
          msg = [{
            title: '중복 오류',
            content: error.error?.message || '이미 존재하는 데이터 입니다.'
          }]
        } break;

        // ========== 💥 서버 오류 (500번대) ==========
        case 500: {
          msg = [{ title: `서버 오류 (${error.status})`, content: '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도하여 주세요.' }];
        } break;

        default: {
          msg = [{ title: `오류 (${error.status})`, content: parseErrorMessage(error) }];
        } break;
      }
      alertService.openSheet(msg);

      // 🔍 개발 환경에서만 상세 로그
      if (!environment.production) {
        console.group('🔥 HTTP Error');
        console.log('URL:', error.url);
        console.log('Status:', error.status);
        console.log('Error:', error.error);
        console.log('Message:', error.message);
        console.groupEnd();
      }

      // ❗ 에러 다시 던지기 (중요!)
      return throwError(() => error);
    })
  );
};

// ========== 🛠️ 헬퍼 함수 ==========

/**
 * ASP.NET Core ValidationProblem 파싱
 */
function parseValidationError(error: HttpErrorResponse): IBottomSheet[] {
  const errorBody = error.error;

  // 1️⃣ ASP.NET Core ValidationProblem 형식
  if (errorBody?.errors && typeof errorBody.errors === 'object') {
    const errors = errorBody.errors;
    const messages = Object.keys(errors)
      .map(key => {
        const errorMessages = errors[key];
        return Array.isArray(errorMessages)
          ? errorMessages.join('n')
          : errorMessages;
      }).join('\n');

    return [{
      title: errorBody.title || '입력 오류',
      content: messages || '입력 데이터를 확인해주세요.'
    }];
  }

  // 2️⃣ 커스텀 메시지
  if (errorBody?.message) {
    return [{
      title: '요청 오류',
      content: errorBody.message
    }];
  }

  // 3️⃣ 단순 문자열
  if (typeof errorBody === 'string') {
    return [{
      title: '요청 오류',
      content: errorBody
    }];
  }

  // 4️⃣ 기본 메시지
  return [{
    title: '요청 오류',
    content: '잘못된 요청입니다. 입력 데이터를 확인해주세요.'
  }];

}

/**
 * 일반 에러 메시지 파싱
 */
function parseErrorMessage(error: HttpErrorResponse): string {
  // 1️⃣ error.error가 문자열
  if (typeof error.error === 'string') {
    return error.error;
  }

  // 2️⃣ error.error.message 존재
  if (error.error?.message) {
    return error.error.message;
  }

  // 3️⃣ error.error.title 존재 (ASP.NET ProblemDetails)
  if (error.error?.title) {
    return error.error.title;
  }

  // 4️⃣ error.message (HttpErrorResponse 자체)
  if (error.message) {
    return error.message;
  }

  // 5️⃣ 기본 메시지
  return '요청 처리 중 오류가 발생했습니다.';
}
