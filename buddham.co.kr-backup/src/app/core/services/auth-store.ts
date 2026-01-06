import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '@app/core/interfaces/i-user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn.asObservable();
  private _currentUser = new BehaviorSubject<IUser | null>(null);
  public currentUser$ = this._currentUser.asObservable();

  readonly isLoggedIn = toSignal(this.isLoggedIn$, { initialValue: false });

  // 초기 인증 상태 체크
  setLogin(user: IUser) {
    this._isLoggedIn.next(true);
    this._currentUser.next(user);
  }

  updateCurrentUser = (user: IUser) => this._currentUser.next(user);

  clear() {
    this._isLoggedIn.next(false);
    this._currentUser.next(null);
  }
}
