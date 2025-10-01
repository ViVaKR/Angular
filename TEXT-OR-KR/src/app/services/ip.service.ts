import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IIpInfo } from '@app/interfaces/i-ip-info';
import { BehaviorSubject, catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  ipAddressUrl = environment.ipAddressUrl;

  private _ipInfo = new BehaviorSubject<IIpInfo | null>(null);

  public readonly ipInfo$ = this._ipInfo.asObservable();

  private _cachedIpAddress$: Observable<IIpInfo>;

  constructor(private http: HttpClient) {

    this._cachedIpAddress$
      = this.http.get<IIpInfo>(`${this.ipAddressUrl}/api/ip`)
        .pipe(tap(
          data => {
            this._ipInfo.next(data);
          }),
          catchError(
            error => {
              const errorIpInfo: IIpInfo =
              {
                ip: '0.0.0.0',
                city: '-',
                region: '-',
                country: '-',
                isp: '-'
              };

              this._ipInfo.next(errorIpInfo);

              // of()를 사용하여 Observable<IIpInfo> 반환
              return of(errorIpInfo);
            }),

          shareReplay({ bufferSize: 1, refCount: true })
        );

    this._cachedIpAddress$.subscribe();
  }

  getIpInfo(): Observable<IIpInfo | null> {
    return this.ipInfo$;
  }

  refreshIpInfo(): void {
    this._cachedIpAddress$.subscribe(); // 다시 구독하여 API 호출을 트리거
  }
};
