import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { IMAGE_CONFIG, APP_BASE_HREF } from '@angular/common';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { provideHighlightOptions } from "ngx-highlightjs";
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { tokenInterceptor } from './interceptor/token.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'; // Import TranslateModule
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom(
      TranslateModule.forRoot({
        useDefaultLang: true,
        defaultLanguage: 'ko-KR',
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    { provide: AllMatModule, useClass: AllMatModule },
    // 한글 짤림 현상 방지
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },
    {
      provide: IMAGE_CONFIG, useValue:
      {
        disableImageSizeWarning: true,
        disableImageLazyLoading: true,
      }
    },
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
    }),
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: false
    },
    {
      provide: 'LOCALE_ID',
      useValue: 'ko-KR'
    },
    // index.html 의 테크 <base href="/"> 과 동일
    { provide: APP_BASE_HREF, useValue: "/" },
  ]
};
