import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { APP_BASE_HREF, IMAGE_CONFIG } from '@angular/common';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    { provide: COMPOSITION_BUFFER_MODE, useValue: false }, // 한글 짤림 현상 방지
    { provide: MATERIAL_SANITY_CHECKS, useValue: false }, // Material sanity check 비활성화
    { provide: 'LOCALE_ID', useValue: 'ko-KR' }, // 한글 날짜 표시
    { provide: APP_BASE_HREF, useValue: '/' }, // base href 설정
    {
      provide: IMAGE_CONFIG, useValue:
      {
        disableImageSizeWarning: true,
        disableImageLazyLoading: true,
      }
    }, provideAnimationsAsync(),
  ]
};
