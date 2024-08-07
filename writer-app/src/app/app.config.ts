import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { IMAGE_CONFIG } from '@angular/common';
import { AngularMaterialModule } from '@app/modules/angular-material/angular-material.module';

export const appConfig: ApplicationConfig = {

  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      languages: {
        csharp: () => import('highlight.js/lib/languages/csharp'),
        cpp: () => import('highlight.js/lib/languages/cpp'),
        c: () => import('highlight.js/lib/languages/c'),
        css: () => import('highlight.js/lib/languages/css'),
        dart: () => import('highlight.js/lib/languages/dart'),
        dns: () => import('highlight.js/lib/languages/dns'),
        ini: () => import('highlight.js/lib/languages/ini'),
        http: () => import('highlight.js/lib/languages/http'),
        javascript: () => import('highlight.js/lib/languages/javascript'),
        powershell: () => import('highlight.js/lib/languages/powershell'),
        python: () => import('highlight.js/lib/languages/python'),
        scss: () => import('highlight.js/lib/languages/scss'),
        shell: () => import('highlight.js/lib/languages/shell'),
        sql: () => import('highlight.js/lib/languages/sql'),
        typescript: () => import('highlight.js/lib/languages/typescript'),
        nginx: () => import('highlight.js/lib/languages/nginx'),
        rust: () => import('highlight.js/lib/languages/rust'),
        json: () => import('highlight.js/lib/languages/json'),
        markdown: () => import('highlight.js/lib/languages/markdown'),
        vim: () => import('highlight.js/lib/languages/vim'),
        cmake: () => import('highlight.js/lib/languages/cmake'),
        dos: () => import('highlight.js/lib/languages/dos'),
        java: () => import('highlight.js/lib/languages/java'),
        yaml: () => import('highlight.js/lib/languages/yaml'),
        xml: () => import('highlight.js/lib/languages/xml'),
      }
    }),
    {
      provide: IMAGE_CONFIG, useValue:
      {
        disableImageSizeWarning: true,
        disableImageLazyLoading: true,
      }
    },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },
    { provide: MATERIAL_SANITY_CHECKS, useValue: false },
    { provide: 'LOCAL_ID', useValue: 'ko-KR' },
    { provide: AngularMaterialModule, useClass: AngularMaterialModule }
  ]
};
