import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, SecurityContext } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { IMAGE_CONFIG } from '@angular/common';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { tokenInterceptor } from './interceptor/token.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideMarkdown, CLIPBOARD_OPTIONS, MARKED_OPTIONS } from 'ngx-markdown';
import { ClipboardButtonComponent } from './common/clipboard-button/clipboard-button.component';


const httpLoaderFactory: (http: HttpClient)
  => TranslateHttpLoader = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules), // 사전로딩 전략으로 이는 모든 모듈을 사전로딩합니다.
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        useDefaultLang: true,
        defaultLanguage: 'ko',
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    { provide: AngularMaterialModule, useClass: AngularMaterialModule },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false }, // 한글 짤림 현상 방지
    { provide: MATERIAL_SANITY_CHECKS, useValue: false }, // Material sanity check 비활성화
    { provide: 'LOCALE_ID', useValue: 'ko-KR' }, // 한글 날짜 표시
    {
      provide: IMAGE_CONFIG, useValue:
      {
        disableImageSizeWarning: true,
        disableImageLazyLoading: true,
      }
    },
    provideHighlightOptions({
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      fullLibraryLoader: () => import('highlight.js'),
    }),
    provideMarkdown({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: true,
          sanitizer: true,
          tables: true
        },
      },
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: ClipboardButtonComponent
        },
      }
    }),

  ]
};
