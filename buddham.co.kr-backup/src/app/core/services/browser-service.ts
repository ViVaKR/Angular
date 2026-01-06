import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({providedIn: 'root',})
export class BrowserService {

  constructor(@Inject(PLATFORM_ID) private plattformId: object) {
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.plattformId);
  }

  get origin(): string {
    return this.isBrowser ? window.location.origin : '';
  }
}















