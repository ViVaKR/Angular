import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponse } from '@app/interfaces/i-auth-response';
import { IRegisterRequest } from '@app/interfaces/i-register-request';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  signUp(data: IRegisterRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.baseUrl}/api/account/signup`, data);
  }

}
