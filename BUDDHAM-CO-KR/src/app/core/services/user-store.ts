import { computed, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '@app/core/interfaces/i-user';
import { environment } from '@env/environment.development';

@Injectable({ providedIn: 'root' })
export class UserStore {

  private baseUrl = environment.apiUrl;
  public readonly defaultAvatar = `${this.baseUrl}/Images/avatars/buddha.png`;

  // 🔹 Signal 기반으로 통일
  private readonly _user = signal<IUser | null>(null);
  private readonly _isInitialized = signal(false);

  // 🔹 읽기 전용 public API
  readonly user = this._user.asReadonly();
  readonly isInitialized = this._isInitialized.asReadonly();

  // RxJS Observable (기존 코드 호완용)
  public user$ = toObservable(this._user);

  public currentUser = toSignal<IUser | null>(this.user$, { initialValue: null });

  // ✨ 이메일 인증 상태
  public isEmailConfirmed = computed(() => {
    return this.currentUser()?.emailConfirmed ?? false;
  });

  // ✨ 사용자 역할
  public userRoles = computed(() => {
    const roles = this.currentUser()?.roles;
    if (!roles) return [];
    return Array.isArray(roles) ? roles : [roles];
  });

  // ✨ 아바타 (타입 안전성 강화)
  readonly avatar = computed(() => {
    const currentUser = this.user();
    if (!currentUser) {
      return this.defaultAvatar;
    }
    if (currentUser.avatar === 'default.png') {
      return this.defaultAvatar;
    }
    return `${this.baseUrl}/Images/avatars/${currentUser.id}/${currentUser.avatar}`;
  });


  // ✨ 사용자 ID (편의 메서드)
  readonly userId = computed(() => this.user()?.id ?? null);

  // ✨ 필명 (편의 메서드)
  readonly userPseudonym = computed(() => this.user()?.pseudonym ?? '');

  readonly userEmail = computed(() => this.user()?.email ?? null);

  // 🔹 개발 모드에서만 로그 출력
  private readonly isDev = !environment.production;

  // 🔹 사용자 설정
  setUser(user: IUser) {
    this._user.set(user);
    this._isInitialized.set(true);
  }

  // 🔹 사용자 업데이트 (전체)
  updateUser(user: IUser) {
    this._user.set(user);
  }

  // 🔹 사용자 부분 업데이트
  patchUser(updates: Partial<IUser>) {
    const current = this._user();
    if (current) {
      this._user.set({ ...current, ...updates });
    }
  }

  // 🔹 초기화 상태만 설정 (토큰 없을 때)
  setInitialized() {
    this._isInitialized.set(true);
  }
  // 🔹 사용자 정보 초기화
  clearUser(): void {
    this._user.set(null);
    this._isInitialized.set(true);
  }

  // 🔹 로그인 여부 체크
  readonly isLoggedIn = computed(() => this.user() !== null);

  // 🔹 특정 역할 보유 여부 체크
  hasRole(role: string): boolean {
    return this.userRoles().includes(role);
  }

  // 🔹 여러 역할 중 하나라도 보유 체크
  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.userRoles();
    return roles.some(role => userRoles.includes(role));
  }

  // 🔹 모든 역할 보유 체크
  hasAllRoles(roles: string[]): boolean {
    const userRoles = this.userRoles();
    return roles.every(role => userRoles.includes(role));
  }
}
