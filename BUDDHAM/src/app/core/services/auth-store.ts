import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '@app/core/interfaces/i-user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _currentUser = new BehaviorSubject<IUser | null>(null);

  public isLoggedIn$ = this._isLoggedIn.asObservable();
  public currentUser$ = this._currentUser.asObservable();

  public readonly isLoggedIn = toSignal(this.isLoggedIn$, { initialValue: false });
  public readonly currentUser = toSignal(this.currentUser$, { initialValue: null });

  // 초기 인증 상태 체크
  public setLogin(user: IUser) {
    this._isLoggedIn.next(true);
    this._currentUser.next(user);
  }

  public updateCurrentUser = (user: IUser) => this._currentUser.next(user);

  public clear() {
    this._isLoggedIn.next(false);
    this._currentUser.next(null);
  }
}
