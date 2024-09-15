import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampService implements OnDestroy {

  public observable =
    new Observable<number>(subscriber =>
      subscriber.next(Math.random()));

  public subject = new Subject<number>();

  constructor() { }

  next(value: number) {
    this.subject.next(value);
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }
}
