import {
  ApplicationConfig,
  inject,
  LOCALE_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';

import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import localeKo from '@angular/common/locales/ko';
import { registerLocaleData } from '@angular/common';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { TokenStorage } from '@app/core/services/token-storage';
import { AuthService } from '@app/core/services/auth-service';
import { AuthStore } from './core/services/auth-store';
import { UserStore } from './core/services/user-store';
import { lastValueFrom, take, timeout } from 'rxjs';
import { httpErrorInterceptor } from './core/interceptors/http-error-interceptor';

registerLocaleData(localeKo);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions({ skipInitialTransition: true }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      }),
      withComponentInputBinding() // 앵커 링크 자동 스크롤
    ),
    provideAppInitializer(async () => {
      const tokenStorage = inject(TokenStorage);
      const authService = inject(AuthService);
      const authStore = inject(AuthStore);
      const userStore = inject(UserStore);

      const token = tokenStorage.getAccessToken();

      if (!token) {
        userStore.setInitialized();
        return Promise.resolve();
      }

      // 사용자 정보 로드
      try {
        const user = await lastValueFrom(
          authService.loadCurrentUser().pipe(
            take(1),
            timeout(5_000) // 5초 타임아웃
          ));

        if (user == null) {
          await authService.clearToken();
          return;
        }
        authStore.setLogin(user);
        userStore.setUser(user);

      } catch (error: any) {
        await authService.clearToken();
      } finally {
        userStore.setInitialized();
      }
    }),
    provideHttpClient(withInterceptors([
      tokenInterceptor,
      httpErrorInterceptor
    ]), withFetch()),
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },
    { provide: LOCALE_ID, useValue: 'ko-KR' },
  ]
};
