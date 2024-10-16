import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection, SecurityContext } from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withInMemoryScrolling, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { IMAGE_CONFIG, registerLocaleData } from '@angular/common';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { tokenInterceptor } from './interceptor/token.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideMarkdown, MarkedRenderer, MarkedOptions, CLIPBOARD_OPTIONS, MARKED_OPTIONS, MarkdownModuleConfig } from 'ngx-markdown';
import { ClipboardButtonComponent } from './common/clipboard-button/clipboard-button.component';
import localeKo from '@angular/common/locales/ko';
import MarkdownIt from 'markdown-it'; // markdown-it 가져오기
import { CustomRouteReuseStrategy } from './helper/custom-route-reuse-strategy';
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  renderer.listitem = (text: string) => {
    return '<li>' + text + '</li>';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false
  };
}

const markdownConfig: MarkdownModuleConfig = {
  loader: HttpClient,
  sanitize: SecurityContext.NONE,
  markedOptions: {
    provide: MARKED_OPTIONS,
    useFactory: markedOptionsFactory,
    deps: [],
  },
  clipboardOptions: {
    provide: CLIPBOARD_OPTIONS,
    useValue: {
      buttonComponent: ClipboardButtonComponent
    },
  }
};

registerLocaleData(localeKo)
const httpLoaderFactory: (http: HttpClient)
  => TranslateHttpLoader = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes, withPreloading(PreloadAllModules), // 사전로딩 전략으로 이는 모든 모듈을 사전로딩합니다.

      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
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
    { provide: LOCALE_ID, useValue: 'ko-KR' }, // 한글 날짜 표시
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
    provideMarkdown(markdownConfig),

  ]
};
