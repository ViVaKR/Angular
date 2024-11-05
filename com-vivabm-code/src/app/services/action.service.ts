import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  // footer bar를 표시할지 여부를 나타내는 Observable
  private _footerBar = new BehaviorSubject<boolean>(false);
  footerBar$ = this._footerBar.asObservable();

  footerBarOn(): void {
    this._footerBar.next(false);
  }
  footerBarOff(): void {
    this._footerBar.next(true);
  }
}
