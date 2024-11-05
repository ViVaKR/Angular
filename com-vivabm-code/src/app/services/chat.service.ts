import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

export interface IMessage {
  user: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io('https://ns.text.or.kr');
  // private socket = io('http://localhost:9387');

  sendMessage(message: IMessage) {
    this.socket.emit('new-message', message);
  }

  getMessages() {
    let observable = new Observable<IMessage>(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
