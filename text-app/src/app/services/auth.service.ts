import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '@app/interfaces/auth-response';
import { LoginRequest } from '@app/interfaces/login-request';
import { environment } from '@env/environment.development';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '@app/interfaces/register-request';
import { UserDetail } from '@app/interfaces/user-detail';
import { ResetPasswordRequest } from '@app/interfaces/reset-password-request';
import { ChangePasswordRequest } from '@app/interfaces/change-password-request';
import { DeleteAccountRequest } from '@app/interfaces/delete-account-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;

  private userKey = 'user';

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

  // 비밀번호 분실시 이메일 확인 메서드
  forgetPassword(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/account/forgetpassword`, { email });
  }

  // 비밀번호 분실시 이메일 확인 메서드
  forgetPwd(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/account/forgetpwd`, { email });
  }

  // 비밀번호 재설정 메서드
  resetPassword(data: ResetPasswordRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/account/resetpassword`, data);
  }

  changePassword(data: ChangePasswordRequest): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${this.apiURL}/account/changepassword`, data);
  }

  //* 로그인 메서드
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/account/signin`, data).pipe(
      map((response: AuthResponse) => {
        if (response.isSuccess) {
          localStorage.setItem(this.userKey, JSON.stringify(response));
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
    // return true;
    return !this.isTokenExpired(); // 복원위치
  }

  //* (패키지설치 필요) -> `npm install jwt-decode`
  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) return true;
    const isTokenExpired = (decoded['exp']! * 1000) <= Date.now(); // 1000을 곱해주는 이유는 밀리세컨드로 변환하기 위함

    // if (isTokenExpired) this.logout();

    // return true;
    return isTokenExpired; // 복원위치
  }

  //* 로그아웃 메서드
  logout = (): void => {
    localStorage.removeItem(this.userKey);
    this._isSignIn.next(false);
    this.adminNext(false);
  };

  refreshToken = (data: {
    email: string;
    token: string;
    refreshToken: string;
  }): Observable<AuthResponse> => this.http.post<AuthResponse>(`${this.apiURL}/account/refresh-token`, data);

  //* 토근을 가져오는 메서드
  getToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.token;
  }

  //* 토근을 가져오는 메서드
  getRefreshToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.refreshToken;
  }

  // 사용자 삭제 메서드 (관리자용)
  deleteUser(data: DeleteAccountRequest): Observable<AuthResponse> {
    return this.http.delete<AuthResponse>(`${this.apiURL}/account/delete`, { body: data });
  }

  // 회원 탈퇴 메서드 (사용자용)
  cancelMyAccount(data: DeleteAccountRequest): Observable<AuthResponse> {
    return this.http.delete<AuthResponse>(`${this.apiURL}/account/cancel-my-account`, { body: data });
  }
}
