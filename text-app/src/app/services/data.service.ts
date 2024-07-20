import { Injectable } from '@angular/core';
import { BuddistScripture } from '@app/types/buddist-scripture';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private id = new Subject<number>();

  id$ = this.id.asObservable();

  next(data: number) {
    this.id.next(data);
  }

  constructor() { }
}
