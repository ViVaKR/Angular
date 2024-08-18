import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponse } from '@app/interfaces/i-auth-response';
import { IToken } from '@app/interfaces/i-token';
import { environment } from '@env/environment.development';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ISignInRequest } from '@app/interfaces/i-signin-request';
import { IUserDetail } from '@app/interfaces/i-user-detail';
import { IRegisterRequest } from '@app/interfaces/i-register-request';
import { IForgetPasswordRequest } from '@app/interfaces/i-forget-password-request';
import { IResetPasswordRequest } from '@app/interfaces/i-reset-password-request';
import { IConfirmEmailRequest } from '@app/interfaces/i-confirm-email-request';
import { IConfirmEmailReplay } from '@app/interfaces/i-confirm-email-replay';
import { IChangePasswordRequest } from '@app/interfaces/i-change-password-request';
import { IDeleteAccountRequest } from '@app/interfaces/i-delete-account-request';
import { IResponse } from '@app/interfaces/i-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // apiUrl = environment.apiUrl;
  baseUrl = environment.baseUrl;

  private userKey = 'user';

  private _isSignIn = new BehaviorSubject<boolean>(false);
  private _isAdmin = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this._isSignIn.next(this.isLoggedIn());
  }

  //* 사용자 목록을 가져옵니다.
  getUsers(): Observable<IUserDetail[]> {
    return this.http.get<IUserDetail[]>(`${this.baseUrl}/api/account/list`);
  }

  //* 회원가입 요청을 보냅니다.
  signUp(data: IRegisterRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.baseUrl}/api/account/signup`, data);
  }

  //* 사용자 상세 정보를 가져옵니다.
  getAccountById(id: string): Observable<IUserDetail> {
    return this.http.get<IUserDetail>(`${this.baseUrl}/api/account/${id}`);
  }

  //* 비밀번호 분실시 이메일 확인 메서드
  forgetPassword(email: string): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.baseUrl}/api/account/forgetpwd`, { email });
  }

  //* 비밀번호 재설정 메서드
  resetPassword(data: IResetPasswordRequest): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/api/account/reset-password`, data);
  }

  //* 이메일 확인 (1), confirm-send-mail
  confirmSendEmail(email: IConfirmEmailRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.baseUrl}/api/account/confirm-send-email`, email);
  }

  //* 이메일 확인 회신 (2), confirm-email
  confirmReplyEmail(email: IConfirmEmailReplay): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.baseUrl}/api/account/confirm-replay-email`, email);
  }

  //* 비밀번호 변경
  changePassword(data: IChangePasswordRequest): Observable<IAuthResponse> {
    return this.http.put<IAuthResponse>(`${this.baseUrl}/api/account/change-password`, data);
  }

  //--> signIn
  signIn(data: ISignInRequest): Observable<IAuthResponse> {

    return this.http.post<IAuthResponse>(`${this.baseUrl}/api/account/signin`, data).pipe(
      map((response: IAuthResponse) => {
        if (response.isSuccess) {
          localStorage.setItem(this.userKey, JSON.stringify(response));
          this._isSignIn.next(true);
        } else {
          this._isSignIn.next(false);
        }
        return response;
      }));
  }

  //* Check if user is signed in
  get isSignIn() {
    return this._isSignIn.asObservable();
  }

  //* Check if user is admin
  isAdmin() {
    return this._isAdmin.asObservable();
  }

  adminNext(state: boolean) {
    this._isAdmin.next(state);
  }

  //* Get User Details
  getDetail = (): Observable<IUserDetail> => {
    return this.http.get<IUserDetail>(`${this.baseUrl}/api/account/detail`);
  }

  getUserDetail = () => {

    const token = this.getToken();

    if (!token) return null;

    const decoded: any = jwtDecode(token);

    const userDetail = {
      id: decoded.nameid,
      fullName: decoded.name,
      email: decoded.email,
      roles: decoded.role
    };

    this.adminNext(userDetail.roles.includes('Admin'));

    return userDetail;
  }

  getRoles(): string[] | null {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  }

  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) return true;
    const isTokeExpired = (decoded['exp'] * 1000) <= Date.now();
    return isTokeExpired;
  }

  //* 토큰 갱신
  getRefreshToken(): string | null {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: IAuthResponse = JSON.parse(user);
    return userDetail.refreshToken;
  }

  getToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: IAuthResponse = JSON.parse(user);
    return userDetail.token;
  }

  refreshToken(data: IToken): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.baseUrl}/api/account/refresh-token`, data);
  }

  //* 사용자 삭제 (관리자용)
  deleteUser(data: IDeleteAccountRequest): Observable<IAuthResponse> {
    return this.http.delete<IAuthResponse>(`${this.baseUrl}/api/account/delete`, { body: data });
  }
  //* 회원 탈퇴 (사용자용)
  cancelMyAccount(data: IDeleteAccountRequest): Observable<IAuthResponse> {

    return this.http.delete<IAuthResponse>(`${this.baseUrl}/api/account/cancel-my-account`, { body: data });
  }

  signOut(): void {
    localStorage.removeItem(this.userKey);
    this._isSignIn.next(false);
    this.adminNext(false);
  }
}

