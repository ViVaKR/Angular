import { inject, Injectable } from '@angular/core';
import { IIpInfo } from '@app/interfaces/i-ip-info';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  // baseUrl = 'http://192.168.0.8:5130';
  apiUrl = 'https://ip.writer.or.kr';
  baseUrl = 'https://ns.vivakr.com';

  http = inject(HttpClient);

  getIpInfo = (ipaddress: string): Observable<IIpInfo> =>
    this.http.get<IIpInfo>(`${this.baseUrl}/api/ip/${ipaddress}`);


  getMyInfo = (): Observable<IIpInfo> =>
    this.http.get<IIpInfo>(`${this.baseUrl}/api/ip`);

  getHtmlContent(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

}
