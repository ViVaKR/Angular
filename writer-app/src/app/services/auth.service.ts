import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserDetail } from '../interfaces/user-detail';
import { AuthResponse } from '@app/interfaces/auth-response';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '@app/interfaces/register-request';
import { SigninRequest } from '@app/interfaces/signin-request';
import { DeleteAccountRequest } from '@app/interfaces/delete-account-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  apiURL = 'https://localhost:50011';
  private userKey = 'user';

  private _isSignIn = new BehaviorSubject<boolean>(false);
  get isSignIn() {
    return this._isSignIn.asObservable();
  }
  private _isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin = () => this._isAdmin.asObservable();

  adminNext = (value: boolean) => this._isAdmin.next(value);

  constructor(private http: HttpClient) { }

  // 회원가입
  signUp(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/api/account/signup`, data);
  }

  // 로그인
  signIn(data: SigninRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/api/account/signin`, data)
      .pipe(
        map((res: AuthResponse) => {
          if (res.isSuccess) {
            localStorage.setItem(this.userKey, JSON.stringify(res));
            this._isSignIn.next(true);
          } else {
            this._isSignIn.next(false);
          }
          return res;
        })
      );
  }

  // 로그인 여부 확인
  isLoginIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  }

  // 토큰 만료 여부 확인
  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) return true;
    const isTokenExpired = (decoded['exp'] * 1000) <= Date.now(); // 1000 to convert seconds to milliseconds

    return isTokenExpired
  }

  // 로그아웃
  signOut = () => {
    localStorage.removeItem(this.userKey);
    this._isSignIn.next(false);
    this.adminNext(false);
  }

  // 토큰 가져오기
  getToken(): string | null {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.token;
  }

  // 토큰 갱신
  refreshToken = (data: {
    email: string;
    token: string;
    refreshToken: string;
  }): Observable<AuthResponse> => this.http.post<AuthResponse>(`${this.apiURL}/api/account/refresh-token`, data);

  // 사용자 목록 가져오기
  getUserList = (): Observable<UserDetail[]> => this.http.get<UserDetail[]>(`${this.apiURL}/api/account/users`);

  // 사용자 상세 정보 가져오기
  getDetail = (): Observable<UserDetail> => this.http.get<UserDetail>(`${this.apiURL}/api/account/detail`);


  // 사용자 정보 가져오기
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
    this.adminNext(userDetail.role.include('Admin'));
    return userDetail;
  }

  // 사용자 역할 가져오기
  getRoles = (): string[] | null => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
  }

  // 사용자 삭제 (관리자 전용)
  deleteUser = (data: DeleteAccountRequest): Observable<AuthResponse> =>
    this.http.delete<AuthResponse>(`${this.apiURL}/api/account/delete`, { body: data });

  // 회원탈된 (사용자 전용)
  cancelMyAccount(data: DeleteAccountRequest): Observable<AuthResponse> {
    return this.http.delete<AuthResponse>(`${this.apiURL}/api/account/cancel-my-account`, { body: data });


  }
}
