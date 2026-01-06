import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TokenStorage {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private ACCESS_TOKEN = 'access_token';
  private REFRESH_TOKEN = 'refresh_token';

  saveAccessToken(token: string) {
    if (this.isBrowser)
      localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  getAccessToken(): string | null {
    if (this.isBrowser)
      return localStorage.getItem(this.ACCESS_TOKEN);
    return null;
  }

  saveRefreshToken(token: string) {
    if (this.isBrowser)
      localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  getRefreshToken(): string | null {
    if (this.isBrowser)
      return localStorage.getItem(this.REFRESH_TOKEN);
    return null;
  }

  clear() {
    if (this.isBrowser) {
      localStorage.removeItem(this.ACCESS_TOKEN);
      localStorage.removeItem(this.REFRESH_TOKEN);
    }
  }
}
