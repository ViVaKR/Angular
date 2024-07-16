import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { IMAGE_CONFIG } from '@angular/common';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { provideHighlightOptions } from "ngx-highlightjs";
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),

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
    }
  ]
};
