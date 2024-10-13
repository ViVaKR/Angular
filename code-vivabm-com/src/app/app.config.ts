import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection, SecurityContext } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
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
import { NgxEditorModule } from 'ngx-editor';
import localeKo from '@angular/common/locales/ko';

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

const markdownConfig: MarkdownModuleConfig = {
  loader: HttpClient,
  sanitize: SecurityContext.NONE,
  markedOptions: {
    provide: MARKED_OPTIONS,
    useFactory: markedOptionsFactory,
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
};

registerLocaleData(localeKo)
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
    importProvidersFrom(
      NgxEditorModule.forRoot({
        icons: {
          bold: '<img src="https://img.icons8.com/tiny-glyph/16/null/bold.png" width="15" height="15"/>',
        },

        locals: {
          // menu
          bold: 'Bold',
          italic: 'Italic',
          code: 'Code',
          underline: 'Underline',
          strike: 'Strike',
          blockquote: 'Blockquote',
          bullet_list: 'Bullet List',
          ordered_list: 'Ordered List',
          heading: 'Heading',
          h1: 'Header 1',
          h2: 'Header 2',
          h3: 'Header 3',
          h4: 'Header 4',
          h5: 'Header 5',
          h6: 'Header 6',
          align_left: 'Left Align',
          align_center: 'Center Align',
          align_right: 'Right Align',
          align_justify: 'Justify',
          text_color: 'Text Color',
          background_color: 'Background Color',
          horizontal_rule: 'Horizontal rule',
          format_clear: 'Clear Formatting',
          insertLink: 'Insert Link',
          removeLink: 'Remove Link',
          insertImage: 'Insert Image',
          indent: 'Increase Indent',
          outdent: 'Decrease Indent',
          superscript: 'Superscript',
          subscript: 'Subscript',
          undo: 'Undo',
          redo: 'Redo',

          // pupups, forms, others...
          url: 'URL',
          text: 'Text',
          openInNewTab: 'Open in new tab',
          insert: 'Insert',
          altText: 'Alt Text',
          title: 'Title',
          remove: 'Remove',
          enterValidUrl: 'Please enter a valid URL',
        },
      }),
    ),
  ]
};
