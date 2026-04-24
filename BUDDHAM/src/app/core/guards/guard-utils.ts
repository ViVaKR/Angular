// guards/guard-utils.ts
import { Router } from '@angular/router';

/**
 * Guard 공통 유틸리티
 */
export class GuardUtils {

  /**
   * 로그인 페이지로 리다이렉트
   */
  static redirectToSignIn(router: Router, returnUrl: string) {
    return router.createUrlTree(['/SignIn'], {
      queryParams: { returnUrl }
    });
  }

  /**
   * 권한 부족 페이지로 리다이렉트
   */
  static redirectToForbidden(router: Router) {
    return router.createUrlTree(['/forbidden']);
  }

  /**
   * 이메일 인증 페이지로 리다이렉트
   */
  static redirectToVerifyEmail(router: Router, returnUrl: string) {
    return router.createUrlTree(['/verify-email'], {
      queryParams: { returnUrl }
    });
  }
}
