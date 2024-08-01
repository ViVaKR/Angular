import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  baseURL = 'https://localhost:50011';

  constructor(private http: HttpClient) { }

  getMyPublicIp = (): Observable<string> =>
    this.http.get<string>(`${this.baseURL}/get-my-ip`);
}
