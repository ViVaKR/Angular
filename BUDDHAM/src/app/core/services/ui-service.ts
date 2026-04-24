import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private _showbar = new BehaviorSubject<boolean>(false);
  private _showleft = new BehaviorSubject<boolean>(false);

  public showbar$ = this._showbar.asObservable();
  public showleft$ = this._showleft.asObservable();

  showbar() {
    this._showbar.next(true);
  }

  hidebar() {
    this._showbar.next(false);
  }

  toggleLeft() {
    this._showleft.next(!this._showleft.value);
  }

  setLeft(state: boolean) {
    this._showleft.next(state);
  }
}
