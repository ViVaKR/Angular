import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  // progress bar를 표시할지 여부를 나타내는 Observable
  private _progressBar = new BehaviorSubject<boolean>(false);
  progressBar$ = this._progressBar.asObservable();

  progressBarOn(): void {
    this._progressBar.next(true);
  }

  progressBarOff(): void {
    this._progressBar.next(false);
  }

  // footer bar를 표시할지 여부를 나타내는 Observable
  private _footerBar = new BehaviorSubject<boolean>(false);
  footerBar$ = this._footerBar.asObservable();

  footerBarOn(): void {
    this._footerBar.next(true);
  }
  footerBarOff(): void {
    this._footerBar.next(false);
  }

  nextLoading(loading: boolean): void {
    this._loading.next(loading);
  }
}
