import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { IMAGE_CONFIG } from '@angular/common';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { tokenInterceptor } from './interceptor/token.interceptor';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from '@env/environment.development';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),

    { provide: AngularMaterialModule, useClass: AngularMaterialModule },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },
    { provide: MATERIAL_SANITY_CHECKS, useValue: false },
    {
      provide: 'LOCALE_ID',
      useValue: 'ko-KR'
    },
    {
      provide: IMAGE_CONFIG, useValue:
      {
        disableImageSizeWarning: true,
        disableImageLazyLoading: true,
      }
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleId, {
              oneTapEnabled: false
            }),
          }
        ],
        onError: (error) => {
          console.error(error, '오류가 발생했습니다.');
        }
      } as SocialAuthServiceConfig
    },
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js'),
    })
  ]
};
