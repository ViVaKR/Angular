import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  // progress bar를 표시할지 여부를 나타내는 Observable
  private _progressBar = new BehaviorSubject<boolean>(false);
  progressBar$ = this._progressBar.asObservable();

  progressBarOn(): void {
    this._progressBar.next(true);
  }

  progressBarOff = () => this._progressBar.next(false);

  // footer bar를 표시할지 여부를 나타내는 Observable
  private _footerBar = new BehaviorSubject<boolean>(false);
  footerBar$ = this._footerBar.asObservable();

  footerBarOn(): void {
    this._footerBar.next(true);
  }
  footerBarOff(): void {
    this._footerBar.next(false);
  }
}
