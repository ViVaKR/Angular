import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {

  private id = new Subject<number>();

  public displayColumns = new BehaviorSubject<string[]>([]);

  id$ = this.id.asObservable();

  next(id: number): void {
    this.id.next(id);
  }
}
