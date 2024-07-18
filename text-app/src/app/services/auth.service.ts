import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '@app/interfaces/auth-response';
import { LoginRequest } from '@app/interfaces/login-request';
import { environment } from '@env/environment.development';
import { map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  //* Login method
  login(data: LoginRequest): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(`${this.apiURL}/account/signin`, data).pipe(
      map((response: AuthResponse) => {
        if (response.isSuccess) {
          localStorage.setItem(this.tokenKey, response.token);
        }
        return response;
      }));
  }



  //* 로그인 여부를 확인하는 메서드
  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  }

  //* (패키지설치 필요) -> `npm install jwt-decode`
  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) return true;
    const isTokenExpired = (decoded['exp']! * 1000) <= Date.now(); // 1000을 곱해주는 이유는 밀리세컨드로 변환하기 위함

    if (isTokenExpired) this.logout();

    return isTokenExpired;
  }

  //* 토근을 가져오는 메서드
  private getToken = (): string | null => localStorage.getItem(this.tokenKey) || '';

  //* 로그아웃 메서드
  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  };

}