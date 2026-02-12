import { effect, inject, Injectable, signal } from '@angular/core';
import { TokenStorage } from '@app/core/services/token-storage';
import { environment } from '@env/environment.development';
import { catchError, EMPTY, finalize, from, map, Observable, of, retry, switchMap, tap, throwError, timer } from 'rxjs';
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
import { IAppUser } from '../interfaces/i-app-user';
import { IChangePasswordRequest } from '../interfaces/i-change-password-request';
import { AlertService } from './alert-service';
import { UserStore } from './user-store';
import { ITwoFactorSetup } from '../interfaces/i-two-factor-setup';
import { ITwoFactorVerifyResponse } from '../interfaces/i-two-factor-verify-response';
import { ITwoFactorLogin } from '../interfaces/i-two-factor-login';
import { DeviceFingerprinterService } from './device-fingerprinter-service';
import { IRecoveryCodeLogin } from '../interfaces/i-recovery-code-login';
import { IUpdateUserRoles } from '../interfaces/i-update-user-roles';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private fingerprinterService = inject(DeviceFingerprinterService);

  fingerprint = signal<string | null>(null);

  constructor(
    private authStore: AuthStore,
    private userService: UserService,
    private userStore: UserStore,
    private tokenStorage: TokenStorage) {

    effect(async () => {
      await this.getFingerprint();
    });
  }

  async getFingerprint() {
    const fp = await this.fingerprinterService.generateFingerprint();
    this.fingerprint.set(fp);
  }

  // * 1. 회원가입 후 자동으로 로그인 시도
  signUpAndLogin(data: ISignUp): Observable<IAuthResponse> {
    return this.signUp(data).pipe(
      switchMap(res => {
        if (res.rsCode === RsCode.Ok) {
          return this.signIn({ email: data.email, password: data.password });
        }
        return throwError(() => new Error(res.rsMessage));
      })
    );
  }

  // * 2. 회원가입 */
  signUp(data: ISignUp): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/account/signup`, data);
  }

  // * 3. 로그인 */
  signIn(data: Omit<ISignIn, 'deviceFingerprint'>): Observable<IAuthResponse> {
    return from(this.fingerprinterService.generateFingerprint()).pipe(
      switchMap(fp => {
        const payload: ISignIn = {
          ...data,
          deviceFingerprint: fp,
        };
        return this.http.post<IAuthResponse>(
          `${this.baseUrl}/account/signin`,
          payload
        );
      }),
      tap(async (res) => {
        // 2. 2FA 필요
        if (res.requiresTwoFactor) {
          return;
        }
        if (res.isSuccess) {
          this.handleAuthSuccess(res);
          return;
        }
      })
    );
  }

  /* 공통 로직 */
  private handleAuthSuccess(res: IAuthResponse): void {
    this.tokenStorage.saveAccessToken(res.token);
    this.tokenStorage.saveRefreshToken(res.refreshToken);

    this.userService.getMyInfo().subscribe({
      next: user => {
        this.authStore.setLogin(user!);
        this.userStore.setUser(user!);
      },
      error: err => {
        console.error('나의정보 가져오기 실패:', err);
      }
    });
  }

  // ! 2FA 로그인
  signInWith2FA(email: string, code: string, rememberDevice: boolean): Observable<IAuthResponse> {

    const payload: ITwoFactorLogin = {
      email: email,
      code: code,
      rememberDevice: rememberDevice,
      deviceFingerprint: this.fingerprint() ?? ''
    };

    return this.http.post<IAuthResponse>(`${this.baseUrl}/twofactor/login-2fa`, payload)
      .pipe(
        tap(res => {
          if (res.isSuccess)
            this.handleAuthSuccess(res);
          else {
            this.alertService.openSheet([{
              title: '2FA 로그인 실패',
              content: res.message
            }])
          }
        })
      );
  }

  /**
   * 복구 코드를 사용한 로그인
   */
  signInWithRecoveryCode(email: string, recoveryCode: string): Observable<any> {
    const payload: IRecoveryCodeLogin = {
      email: email,
      recoveryCode: recoveryCode.replace(/[-\s]/g, ''), // 하이픈과 공백 제거
    };

    return this.http.post<IAuthResponse>(`${this.baseUrl}/TwoFactor/login-recovery-code`, payload)
      .pipe(
        tap((res) => {
          if (res.isSuccess && res.token) {
            this.handleAuthSuccess(res)
          } else {
            this.alertService.openSheet([{
              title: '2FA 복구코드 로그인 실패',
              content: res.message
            }])
          }
        })
      );
  }

  /**
   * 디바이스 핑거프린트 생성 (기존 메서드가 있다면 재사용)
  */
  private generateDeviceFingerprint(): string {
    const navigator = window.navigator;
    const screen = window.screen;

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.colorDepth,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
    ].join('|');

    return btoa(fingerprint);
  }

  // ⭐ 2FA 설정 관련 메서드들
  enable2FA(): Observable<IResponse<ITwoFactorSetup>> {
    return this.http.post<IResponse<ITwoFactorSetup>>(
      `${this.baseUrl}/twofactor/enable-2fa`, {}
    );
  }
  verify2FA(code: string): Observable<IResponse<ITwoFactorVerifyResponse>> {
    return this.http.post<IResponse<ITwoFactorVerifyResponse>>(
      `${this.baseUrl}/twofactor/verify-2fa`,
      { code }
    );
  }

  disable2FA(): Observable<IResponse<any>> {
    return this.http.post<IResponse<any>>(
      `${this.baseUrl}/twofactor/disable-2fa`,
      {}
    );
  }

  // * 새로고침시에도 로그인 상태 복구 용 (app component)
  loadCurrentUser(): Observable<IUser | null> {

    if (!this.tokenStorage.getAccessToken()) return of(null);

    return this.userService.getMyInfo().pipe(
      tap(user => {
        this.authStore.setLogin(user!);
        this.userStore.setUser(user!);
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  getUserEmailFromToken(): string {
    const token = this.tokenStorage.getAccessToken();
    if (!token) throw new Error('토큰 없음');
    const decoded: any = jwtDecode(token);
    return decoded.email;
  }

  // * 갱신토큰 갱신
  refreshToken(): Observable<IAuthResponse | null> {
    const accessToken = this.tokenStorage.getAccessToken();
    const refreshToken = this.tokenStorage.getRefreshToken();
    if (!accessToken || !refreshToken) return EMPTY;
    const email = this.getUserEmailFromToken();
    const tokenData: IToken = {
      token: accessToken,
      email: email,
      refreshToken: refreshToken
    }

    return this.http.post<IAuthResponse>(`${this.baseUrl}/account/refresh-token`, tokenData)
      .pipe(tap(
        res => {
          if (res.isSuccess) {
            this.tokenStorage.saveAccessToken(res.token);
            this.tokenStorage.saveRefreshToken(res.refreshToken);
          }
        }),
        catchError(() => {
          return of(null); // 실제에러 (네트워크, 서버 오류)
        }
        )
      );
  }

  // * 이메일 중복 체크 API
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
  // * 회원권한 수정
  updateUserRoles(id: string, roles: IUpdateUserRoles): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}/Account/UpdateRoles/${id}`, roles);
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
    return this.http.post<IResponse>(`${this.baseUrl}/account/forgot-password`, email);
  }

  //* 비밀번호 재설정 메서드
  resetPassword(data: IResetPasswordRequest): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/account/reset-password`, data);
  }

  // ✅ 일반 메서드로 변경
  getUserDetail(userId: string): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(`${this.baseUrl}/Account/${userId}`);
  }

  /**
   * 회원 탈퇴 (사용자용)
   * @param dto
   */
  public cancelAccount(dto: ICancelAccount): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.baseUrl}/account/cancel-account`, { body: dto });
  }

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

  // auth-service
  signOut(): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/account/signout`, {});
  }
  async clearToken() {
    this.tokenStorage.clear();
    this.authStore.clear();
    this.userStore.clearUser();
    await this.router.navigate(['/Home']);
  }
}
