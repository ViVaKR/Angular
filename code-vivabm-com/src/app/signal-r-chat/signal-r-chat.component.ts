import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActionService } from '@app/services/action.service';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';

@Component({
  selector: 'app-signal-r-chat',
  standalone: true,
  imports: [

  ],
  templateUrl: './signal-r-chat.component.html',
  styleUrl: './signal-r-chat.component.scss'
})
export class SignalRChatComponent implements OnInit {
  hub: HubConnection;
  actionService = inject(ActionService);

  private hubConnection: signalR.HubConnection;

  ngOnInit(): void {
    const url = 'http://localhost:5083/hub';
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('허브에 연결되었습니다.');
        // 연결이 완료된 후에 메시지를 보냅니다
      })
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('messgeReceived', (user: string, message: string) => {
      console.log(`Message received from ${user}: ${message}`);
    });
  }
  sendMessage(user: number, message: string): void {
    if (this.hubConnection.state === 'Connected') {
      this.hubConnection.invoke('NewMessage', user, message)
        .then(() => console.log('메시지 전송 성공'))
        .catch(err => console.error(`전송실패: ${err.message}`))
    } else {
      console.error('메시지 전송에 실패했습니다. 연결이 끊어졌습니다.');
    }
  }
}
