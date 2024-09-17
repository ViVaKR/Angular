import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private id = new Subject<number>();

  private hangulKey = new Subject<string>();

  id$ = this.id.asObservable();

  next(data: number) {
    this.id.next(data);
  }

  hangulKey$ = this.hangulKey.asObservable();

  hangulKeyNext(data: string) {
    this.hangulKey.next(data);
  }
}
