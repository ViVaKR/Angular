import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SkipLoading } from '@app/helper/skip-loading-token';
import { LoadingService } from '@app/services/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService)
  if (req.context.get(SkipLoading)) { // SkipLoading이라는 토큰이 있는 경우
    // console.log('SkipLoading is set, skipping loading indicator');
    return next(req); // SkipLoading이라는 토큰이 있으면 로딩 인디케이터를 표시하지 않는다.
  }
  // console.log('Loading indicator on => ', req.url);
  loadingService.loadingOn(); // SkipLoading이라는 토큰이 없으면 로딩 인디케이터를 표시한다.
  return next(req).pipe( // 요청이 완료되면 로딩 인디케이터를 끈다.
    finalize(() => {
      // console.log('Loading indicator off');
      loadingService.loadingOff();
    })
  );
};
