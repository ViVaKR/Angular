import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { IMAGE_CONFIG } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    { provide: AngularMaterialModule, useClass: AngularMaterialModule },
    { provide: 'COMPOSITION_BUFFER_MODE', useValue: false },
    { provide: MATERIAL_SANITY_CHECKS, useValue: false },
    { provide: 'LOCAL_ID', useValue: 'ko-KR' },
    {
      provide: IMAGE_CONFIG, useValue:
      {
        disableImageSizeWarning: true,
        disableImageLazyLoading: true,
      }
    },
  ]
};
