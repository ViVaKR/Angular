import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  public message = new BehaviorSubject<string>('Call to me and I will answer you and tell you great and unsearchable things you do not know');
  public currentMessage = this.message.asObservable();

  public nextMessage(message: string) {
    console.log('DataShareService.nextMessage', message);
    this.message.next(message);
  }
}
