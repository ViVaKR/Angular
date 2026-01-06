import { computed, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '@app/core/interfaces/i-user';
import { environment } from '@env/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserStore {

  private baseUrl = environment.apiUrl;
  private _user = new BehaviorSubject<IUser | null>(null);
  public user$ = this._user.asObservable();

  public currentUser = toSignal<IUser | null>(this.user$, { initialValue: null });

  // ✨ 이메일 인증 상태 (computed signal)
  public isEmailConfirmed = computed(() => {
    return this.currentUser()?.emailConfirmed ?? false;
  });

  // ✨ 사용자 역할
  public userRoles = computed(() => {
    return this.currentUser()?.roles ?? 'guest';
  });

  // ✨ 아바타
  public avatar = computed(() => {
    const user = this.currentUser();
    if (!user || user.avatar === 'default.png') {
      return `${this.baseUrl}/Images/lotus.webp`;
    }
    return `${this.baseUrl}/Images/avatars/${user.id}/${user.avatar}`;
  });

  setUser(user: IUser) {
    this._user.next(user);
  }

  updateUser(user: IUser) {
    this._user.next(user);
  }

  // * 부분 업데이트용
  patchUser(updates: Partial<IUser>) {
    const current = this._user.value;
    if (current) {
      this._user.next({ ...current, ...updates });
    }
  }

  getAavatar() {
    const user = this.currentUser();
    return (user?.avatar === 'default.png')
      ? `${this.baseUrl}/Images/lotus.webp`
      : `${this.baseUrl}/Images/avatars/${user?.id!}/${user?.avatar}`
  }

  clearUser() {
    this._user.next(null);
  }
}
