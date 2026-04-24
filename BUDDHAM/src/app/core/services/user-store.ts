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

  /**
   * ✨ 대국민 관리자 서비스 (isAdmin)
   * 관리자 권한 여부를 실시간으로 계산함.
   * 'Admin'이라는 역할 명칭은 파트너님의 백엔드 설정에 맞춰 조
   */
  readonly isAdmin = computed(() => {
    return this.userRoles().includes('Admin');
  });

  readonly isSuper = computed(() => this.hasRole('Super'));

  /**
   * 🧘 스님 전용 서비스
   * 스님 회원만이 볼 수 있는 특별한 게시판이나 기능용입니다.
   */
  readonly isMonk = computed(() => this.hasRole('Monk'));

  /**
  * 💻 개발자 전용 (디버그 로그나 특수 설정용)
  */
  readonly idDev = computed(() => this.hasRole('Dev') || this.hasRole('Buddham'));


  readonly isManager = computed(() => {
    return this.hasAnyRole(['Admin', 'Monk'])
  });

  // ✨ 아바타
  readonly avatar = computed(() => {
    const currentUser = this.user();

    // 1. 유저 정보가 아예 없으면 기본 아바타
    if (!currentUser) return this.defaultAvatar;

    // 2. DB에 default.png라고 적혀 있어도 원칙적인 경로 생성
    // 어차피 파일이 있으면 그 파일을, 없으면 서버 미들웨어가 default를 줄 테니까요!

    const avatarFile = currentUser.avatar || 'default.png';

    if (avatarFile === 'default.png') {
      return this.defaultAvatar;
    }

    // 🔹 개인 아바타 경로: 서버가 404를 캐치할 수 있도록 정확한 URL 생성
    return `${this.baseUrl}/Images/avatars/${currentUser.id}/${avatarFile}`;
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
