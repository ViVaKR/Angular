import { ApplicationConfig, SecurityContext, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { APP_BASE_HREF, IMAGE_CONFIG } from '@angular/common';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { tokenInterceptor } from './interceptor/token.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideMarkdown, MARKED_OPTIONS, MarkedRenderer, MarkedOptions, CLIPBOARD_OPTIONS, ClipboardOptions, ClipboardButtonComponent } from 'ngx-markdown';

const httpLoaderFactory: (http: HttpClient)
  => TranslateHttpLoader = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
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
    { provide: APP_BASE_HREF, useValue: '/' }, // base href 설정
    {
      provide: IMAGE_CONFIG, useValue:
      {
        disableImageSizeWarning: true,
        disableImageLazyLoading: true,
      }
    },
    provideHighlightOptions({
      // coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      fullLibraryLoader: () => import('highlight.js'),
    }),
    provideMarkdown({
      loader: HttpClient,
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      },
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,

        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
          smartLists: true,
          smartypants: true,
        },
      },
      sanitize: SecurityContext.NONE
    }),
  ]
};
