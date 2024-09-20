import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public hideFooter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  nextFooter(value: boolean) {
    this.hideFooter.next(value);
  }
}
