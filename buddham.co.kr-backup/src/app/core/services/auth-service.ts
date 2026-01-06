import { inject, Injectable } from '@angular/core';
import { TokenStorage } from '@app/core/services/token-storage';
import { environment } from '@env/environment.development';
import { catchError, finalize, Observable, of, retry, switchMap, tap, throwError, timer } from 'rxjs';
import { AuthStore } from './auth-store';
import { UserService } from './user-service';
import { ISignIn } from '@app/core/interfaces/i-sign-in';
import { IAuthResponse } from '@app/core/interfaces/i-auth-response';
import { HttpClient } from '@angular/common/http';
import { IToken } from '@app/core/interfaces/i-token';
import { jwtDecode } from "jwt-decode";
import { IUser } from '@app/core/interfaces/i-user';
import { Router } from '@angular/router';
import { ISignUp } from '@app/core/interfaces/i-sign-up';
import { IResponse } from '@app/core/interfaces/i-response';
import { RsCode } from '@app/core/enums/rs-code';
import { IConfirmEmail } from '../interfaces/i-confirm-email';
import { IConfirmEmailReply } from '../interfaces/i-confirm-email-reply';
import { ICancelAccount } from '@interfaces/i-cancel-account';
import { IResetPasswordRequest } from '@interfaces/i-reset-password-request';
import { IForgotPassword } from '../interfaces/i-forgot-password';
import { BrowserService } from './browser-service';
import { IAppUser } from '../interfaces/i-app-user';
import { IChangePasswordRequest } from '../interfaces/i-change-password-request';
import { AlertService } from './alert-service';
import { UserStore } from './user-store';

@Injectable({ providedIn: 'root' })
export class AuthService {

  browserService = inject(BrowserService);

  constructor(
    private authStore: AuthStore,
    private userService: UserService,
    private userStore: UserStore,
    private tokenStorage: TokenStorage
  ) {
    if (this.browserService.isBrowser) {
      console.log('AuthService initialized');
    }
  }

  private baseUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private router = inject(Router);

  /* 1. 회원가입 후 자동으로 로그인 시도 */
  signUpAndLogin(data: ISignUp): Observable<IAuthResponse> {
    return this.signUp(data).pipe(
      switchMap(res => { // 새로운 Observable 반환, map : 상자안의 물건을 바꾸기
        if (res.rsCode === RsCode.Ok) {
          console.log('회원가입 성공, 자동 로그인 시도', res.rsData.email, res.rsData.password);
          return this.signIn({ email: data.email, password: data.password });
        }
        return throwError(() => new Error(res.rsMessage));
      })
    );
  }

  /* 2. 회원가입 */
  signUp(data: ISignUp): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/account/signup`, data);
  }

  /* 3. 로그인 */
  signIn(data: ISignIn): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.baseUrl}/account/signin`, data)
      .pipe(tap(res => {
        if (res.isSuccess) {
          this.handleAuthSuccess(res);
        }
      }));
  }

  /* 공통 로직 */
  private handleAuthSuccess(res: IAuthResponse): void {
    this.tokenStorage.saveAccessToken(res.token);
    this.tokenStorage.saveRefreshToken(res.refreshToken);
    this.userService.getMyInfo().subscribe(
      user => {
        this.authStore.setLogin(user);
        this.userStore.setUser(user);
      }
    );
  }

  // * 새로고침시에도 로그인 상태 복구 용 (app component)
  loadCurrentUser(): Observable<IUser> {
    return this.userService.getMyInfo().pipe(
      tap(user => {
        this.authStore.setLogin(user);
        this.userStore.setUser(user);
        console.log('✅ AuthService: 사용자 정보 저장 완료');
      }));
  }

  getUserEmailFromToken(): string {
    const token = this.tokenStorage.getAccessToken();
    if (!token) throw new Error('토큰 없음');
    const decoded: any = jwtDecode(token);
    return decoded.email;
  }

  // * 갱신토큰 갱신
  refreshToken(): Observable<IAuthResponse> {
    const accessToken = this.tokenStorage.getAccessToken();
    const refreshToken = this.tokenStorage.getRefreshToken();

    if (!accessToken || !refreshToken)
      return throwError(() => new Error('토큰정보가 없습니다.'));
    const email = this.getUserEmailFromToken();
    const tokenData: IToken = {
      token: accessToken,
      email: email,
      refreshToken: refreshToken
    }

    return this.http.post<IAuthResponse>(`${this.baseUrl}/account/refresh-token`, tokenData)
      .pipe(tap(res => {
        if (res.isSuccess) {
          this.tokenStorage.saveAccessToken(res.token);
          this.tokenStorage.saveRefreshToken(res.refreshToken);
        }
      })
      );
  }

  // 이메일 중복 체크 API
  checkEmail(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/account/check-email`, { email });
  }

  // * 필명 중복 체크 API (회원가입 용)
  checkPseudonym(pseudonym: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/account/check-pseudonym`, { pseudonym });
  }

  // * 필명 중복 체크 API (회원정보 수정 용)
  checkPseudonymAuth(pseudonym: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/account/check-pseudonym-auth`, { pseudonym })
  }

  // * 회원정보 수정
  updateUserInfo(id: string, user: IAppUser): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}/account/update-user-info/${id}`, user);
  }

  // * 비밀번호 변경 (회원용)
  changePassword(data: IChangePasswordRequest): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}/account/change-password`, data);
  }



  //* (1) 이메일 확인, confirm-send-mail
  confirmSendEmail(request: IConfirmEmail): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${this.baseUrl}/account/confirm-send-email`,
      request
    ).pipe(
      retry({
        count: 2,
        delay: (error, retryCount) => timer(retryCount * 1_000)
      })
    );
  }

  // * (2) 이메일 확인 회신
  confirmEmailReply(request: IConfirmEmailReply): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${this.baseUrl}/account/confirm-reply-email`,
      request
    ).pipe(
      retry({
        count: 2,
        delay: (error, retryCount) => timer(retryCount * 1_000)
      })
    );
  }


  //* 비밀번호 분실시 이메일 확인 메서드
  public forgotPassword(email: IForgotPassword): Observable<IResponse> {
    console.log(email);
    return this.http.post<IResponse>(`${this.baseUrl}/account/forgot-password`, email);
  }

  //* 비밀번호 재설정 메서드
  resetPassword(data: IResetPasswordRequest): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/account/reset-password`, data);
  }

  /**
   * 회원 탈퇴 (사용자용)
   * @param dto
   */
  public cancelAccount(dto: ICancelAccount): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.baseUrl}/account/cancel-account`, { body: dto });
  }

  // auth-service
  signOut(): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/account/signout`, {});
  }

  alertService = inject(AlertService);

  public async logout() {
    this.signOut().pipe(
      catchError(err => {
        this.alertService.openSheet([{ title: '로그아웃 중 오류', content: err }]);
        return of({ rsCode: RsCode.Error, rsMessage: '' } as IResponse);
      }),
      finalize(async () => {
        await this.clearToken()
      })
    ).subscribe(res => {
      if (res?.rsCode === RsCode.Ok) {
        this.alertService.openSheet([
          {
            title: `로그아웃 (${res.rsCode})`,
            content: res.rsMessage,
          }
        ]);
      }
    });
  }
  async clearToken() {
    this.tokenStorage.clear();
    this.authStore.clear();
    this.userStore.clearUser();
    await this.router.navigate(['/Home']);
  }

}
