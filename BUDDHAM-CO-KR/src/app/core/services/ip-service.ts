import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { IPublicIp } from '../interfaces/i-public-ip';
import { Observable } from 'rxjs';
import { IIpInfo } from '../interfaces/i-ip-info';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  clientInfoUrl = environment.clientInfo;
  publicIpUrl = environment.publicIp;

  private http = inject(HttpClient);

  public getPublicIpAddress = httpResource<IPublicIp>(() => `${this.publicIpUrl}/api/myip`);

  public getMyIpInfomation = httpResource<string>(() => `${this.clientInfoUrl}/api/ip`);

  public getIpInfomation(ip: string): Observable<IIpInfo> {
    return this.http.get<IIpInfo>(`${this.clientInfoUrl}/api/ip/${ip}`);
  }
}
