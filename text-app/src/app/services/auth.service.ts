import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '@app/interfaces/auth-response';
import { LoginRequest } from '@app/interfaces/login-request';
import { environment } from '@env/environment.development';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '@app/interfaces/register-request';
import { UserDetail } from '@app/interfaces/user-detail';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;
  private tokenKey = 'token';

  private _isSignIn = new BehaviorSubject<boolean>(false);
  private _isAdmin = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this._isSignIn.next(this.isLoggedIn());
  }

  getUsers = (): Observable<UserDetail[]> => this.http.get<UserDetail[]>(`${this.apiURL}/account/users`);

  // 회원가입 메서드
  signup(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/account/signup`, data);
  }

  //* 로그인 메서드
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/account/signin`, data).pipe(
      map((response: AuthResponse) => {
        if (response.isSuccess) {
          localStorage.setItem(this.tokenKey, response.token);
          this._isSignIn.next(true);
        } else {
          this._isSignIn.next(false);
        }
        return response;
      }));
  }

  get isSignIn() {
    return this._isSignIn.asObservable();
  }

  isAdmin() {
    return this._isAdmin.asObservable();
  }

  adminNext(state: boolean) {
    this._isAdmin.next(state);
  }

  getDetail = (): Observable<UserDetail> =>
    this.http.get<UserDetail>(`${this.apiURL}/account/detail`);

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role
    };
    this.adminNext(userDetail.role.includes('Admin'));
    return userDetail;
  }

  getRoles = (): string[] | null => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
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
  getToken = (): string | null => localStorage.getItem(this.tokenKey) || '';

  //* 로그아웃 메서드
  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
    this._isSignIn.next(false);
    this.adminNext(false);
  };
}
