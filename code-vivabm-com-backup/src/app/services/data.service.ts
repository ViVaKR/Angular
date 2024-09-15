import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private id = new Subject<number>();

  id$ = this.id.asObservable();

  next(id: number): void {
    this.id.next(id);
  }
}
