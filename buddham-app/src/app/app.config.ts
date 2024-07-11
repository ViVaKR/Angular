import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { IMAGE_CONFIG } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [

    // Zone.js change detection
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Router
    // provideRouter(routes, withDebugTracing()),
    provideRouter(routes),
    provideHttpClient(withFetch()),

    // Client hydration
    provideClientHydration(),

    // Animation support
    provideAnimationsAsync(),
    // 한글 짤림 현상 방지
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },
    {
      provide: IMAGE_CONFIG, useValue:
      {
        disableImageSizeWarning: true,
        disableImageLazyLoading: true,
      }
    },
    { provide: 'NODE_TLS_REJECT_UNAUTHORIZED', useValue: "1" }
  ]
};
