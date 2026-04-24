import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { IResponse } from '@app/core/interfaces/i-response';
import { ITwoFactorSetup } from '@app/core/interfaces/i-two-factor-setup';
import { environment } from '@env/environment.development';
import { DeviceFingerprinterService } from '@services/device-fingerprinter-service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TwoFactorAuthService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private fpService = inject(DeviceFingerprinterService);
  fingerprint = signal<string | null>(null);

  constructor() {
    effect(async () => {
      const fp = await this.fpService.generateFingerprint();
      this.fingerprint.set(fp);
    })
  }

  eanable2Fa(): Observable<IResponse<ITwoFactorSetup>> {
    return this.http.post<IResponse<ITwoFactorSetup>>(`${this.baseUrl}/twofactor/enable-2fa`, {});
  }

  verify2Fa(code: string): Observable<IResponse<ITwoFactorSetup>> {
    return this.http.post<IResponse<ITwoFactorSetup>>(`${this.baseUrl}/twofactor/verify-2fa`, { code });
  }

  disable2Fa(): Observable<IResponse<ITwoFactorSetup>> {
    return this.http.post<IResponse<ITwoFactorSetup>>(`${this.baseUrl}/twofactor/disable-2fa`, {});
  }

  getRecoveryCodes(): Observable<IResponse<string[]>> {
    return this.http.get<IResponse<string[]>>(`${this.baseUrl}/twofactor/recovery-codes`);
  }

}
