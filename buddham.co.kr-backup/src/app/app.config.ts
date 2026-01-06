import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
  inject,
  isDevMode,
  LOCALE_ID,
  PLATFORM_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';

import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import localeKo from '@angular/common/locales/ko';
import { isPlatformBrowser, registerLocaleData } from '@angular/common';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { TokenStorage } from '@app/core/services/token-storage';
import { AuthService } from '@app/core/services/auth-service';
import { firstValueFrom } from 'rxjs';
import { AuthStore } from './core/services/auth-store';
import { UserStore } from './core/services/user-store';

registerLocaleData(localeKo);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    // * 초기 인증
    provideAppInitializer(async () => {

      const tokenStorage = inject(TokenStorage);
      const authService = inject(AuthService);
      const authStore = inject(AuthStore);
      const userStore = inject(UserStore);

      const token = tokenStorage.getAccessToken();

      if (!token) {
        console.log('🚫 초기화: 토큰 없음');
        return Promise.resolve();
      }

      console.log('🔄 초기화: 사용자 로드 시작');

      try {
        const user = await firstValueFrom(authService.loadCurrentUser());
        // 👇 핵심! 두 스토어 모두 업데이트
        authStore.setLogin(user);
        userStore.setUser(user);
        console.log('✅ 초기화: 사용자 로드 완료', user);
        console.log('✅ UserStore 업데이트 완료');
      } catch (error) {
        console.error('❌ 초기화: 사용자 로드 실패', error);
        tokenStorage.clear();
        authStore.clear();
        userStore.clearUser();
      }
    }),

    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: isDevMode() ? ({ transition }) => console.log('🎬 View Transition:', transition) : undefined
      }),

      // * 스클롤 위치 복원
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      }),
      withComponentInputBinding() // 앵커 링크 자동 스크롤
    ),

    /* SSR + Event Relay */
    provideClientHydration(withEventReplay()),

    /* HTTP 클라이언트 */
    provideHttpClient(withInterceptors([tokenInterceptor]), withFetch()),

    // * 한글 입력 최적화
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },

    // * 한글 오케일
    { provide: LOCALE_ID, useValue: 'ko-KR' }
  ]
};

