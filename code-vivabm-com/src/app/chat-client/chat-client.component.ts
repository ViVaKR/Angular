import { CommonModule, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IChatMessage } from '@app/interfaces/i-chat-message';
import { IChatRoom } from '@app/interfaces/i-chat-room';
import { IChatUser } from '@app/interfaces/i-chat-user';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { IPlayChat } from '@app/interfaces/i-play-chat';
import { IUserDetail } from '@app/interfaces/i-user-detail';
import { ActionService } from '@app/services/action.service';
import { AuthService } from '@app/services/auth.service';
import { CodeService } from '@app/services/code.service';
import { FileManagerService } from '@app/services/file-manager.service';
import { environment } from '@env/environment.development';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subscription } from 'rxjs';
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-chat-client',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    JsonPipe,
    DatePipe,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    HighlightAuto,
    HighlightLineNumbers
  ],
  templateUrl: './chat-client.component.html',
  styleUrl: './chat-client.component.scss'
})
export class ChatClientComponent implements OnInit, AfterViewInit, OnDestroy {
  baseUrl = environment.baseUrl;
  // hubUrl = 'https://localhost:7654/chatHub';
  hubUrl = 'https://ns.kimbumjun.co.kr/chatHub';
  chatHub: HubConnection;
  hubConnection: signalR.HubConnection;
  msg: string = '';

  actionService = inject(ActionService);
  fileService = inject(FileManagerService);
  codeService = inject(CodeService);
  authService = inject(AuthService);
  // cdref = inject(ChangeDetectorRef);
  render = inject(Renderer2);

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  fileServiceSub: Subscription;

  currentTime = new Date();
  currentUser: IChatUser;
  currentRooms: IChatRoom[] = [];
  defaultImage = '/login-icon.png';
  chatMessages: IChatMessage[] = [];
  userAvata: WritableSignal<string> = signal(this.defaultImage);

  rooms: IChatRoom[] = [
    {
      roomId: 10001,
      roomName: 'Free',
      description: '자유롭게 대화를 나누세요.',
      chatUsers: [] as IChatUser[],
      playChat: {} as IPlayChat
    },
    {
      roomId: 10002,
      roomName: 'QnA',
      description: '코드에 대하여 질문과 답변을 나누세요.',
      chatUsers: [] as IChatUser[],
      playChat: {} as IPlayChat
    },
    {
      roomId: 10003,
      roomName: 'Info',
      description: '정보를 주고 받습니다.',
      chatUsers: [] as IChatUser[],
      playChat: {} as IPlayChat
    }
  ];

  constructor() {
    this.codeService.isElement.next(true);
  }


  ngOnInit(): void {

    this.actionService.nextLoading(false as boolean);

    const detail = this.authService.getUserDetail();
    if (detail !== null)
      this.currentUser = {
        userId: detail.id,
        userName: detail.fullName
      };

    this.connectToHub();

    // 새로운 방 수신
    this.hubConnection.on('Rooms',
      (room: IChatRoom) => {
        this.currentRooms.push(room);
        this.currentRooms.forEach(x => console.log(x.roomName));
      });

    // 새로운 메시지 수신
    this.hubConnection.on('FullReceived', (message: IChatMessage) => {
      this.chatMessages.push(message);

      setTimeout(() => {
        this.scrollDown();
      }, 0);
    });

    // 새로운 유저입장 메시지 수신
    this.hubConnection.on("PlayerJoined", (chatUser: IChatUser) => {
      console.log(`PlayerJoined: ${chatUser.userName}`);
    });

    // 방 목록 수신
    this.hubConnection.on("CurrentRooms", (rooms: IChatRoom[]) => {
      rooms.forEach(x => console.log(x.roomName));
    });
  }


  ngAfterViewInit(): void {

    this.fileServiceSub = this.fileService.getUserImage().subscribe({
      next: (data: IFileInfo) => {
        if (data.dbPath === null || data.dbPath === undefined || data.dbPath === '-') {
          this.userAvata.set(this.defaultImage);
          return;
        }
        this.userAvata.set(this.createImagePath(`${this.currentUser.userId}_${data.dbPath}`));
      },
      error: (_) => {
        this.userAvata.set(this.defaultImage)
      }
    });

    setTimeout(() => {
      this.scrollDown();
    }, 0);

  }

  onKey($event: KeyboardEvent, message: any) {
    if ($event.key === 'Enter') {
      $event.preventDefault();
      this.newMessage(message);
    }
  }

  // 허브 연결
  connectToHub(): void {
    //
    this.hubConnection = new HubConnectionBuilder().withUrl(this.hubUrl, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }).build();

    this.hubConnection.start().then(() => {
      console.log('Connected');
    }).catch(err => console.error(err.toString()));

  }

  // 방 생성
  createRoom(): void {

    if (this.hubConnection.state === 'Connected') {
      for (let room of this.rooms) {
        this.hubConnection.invoke('CreateRoom', room, this.currentUser)
          .then((x: IChatRoom) => {
            console.log(`방 생성 성공 ${x.roomId}`);
          })
          .catch(err => console.error(`전송실패: ${err.message}`))
      }
    } else {
      console.error('서버와 연결이 없습니다.');
    }
  }

  // 방 목록 요청
  getRoomListFromServer() {
    if (this.hubConnection.state === 'Connected') {
      this.hubConnection.invoke('GetRooms')
        .then(() => {
          console.log('방 목록 요청 성공');
        })
        .catch(err => console.error(`방 목록 요청 실패: ${err.message}`))
    } else {
      console.error('방 목록 요청에 실패했습니다. 연결이 끊어졌습니다.');
    }
  }

  // 방 입장
  joinRoom(roomId: number): void {

    if (this.hubConnection.state === 'Connected') {
      this.hubConnection.invoke('JoinRoom', roomId, this.currentUser)
        .then((x: IChatRoom) => {
          console.log(`입장성공: ${x.roomId}\n${x.roomName}\n${x.description}`);
        })
        .catch(err => console.error(`입장실패: ${err.message}`))
    } else {
      console.error('입장에 실패했습니다. 연결이 끊어졌습니다.');
    }
  }

  currentRoomId: number = 10001;
  // 메시지 전송
  newMessage(newMessage: string): void {

    if (this.hubConnection.state === 'Connected') {
      let message: IChatMessage = {
        roomId: this.currentRoomId,
        userId: this.currentUser.userId,
        userName: this.currentUser.userName,
        message: newMessage,
        avata: this.userAvata(),
        sendTime: new Date()
      }
      this.hubConnection.invoke('NewMessage', message)
        .then(() => {
          console.log('메시지 전송 성공 ');
        })
        .catch(err => console.error(`전송실패: ${err.message}`))
    } else {
      console.error('메시지 전송에 실패했습니다.');
    }
  }

  loadAvata(avata: string): string | null | undefined {
    this.fileService.getUserImage().subscribe({
      next: (data: IFileInfo) => {
        if (data.dbPath === null || data.dbPath === undefined || data.dbPath === '-') {
          return this.defaultImage;
        }
        // this.userAvata.set();
        return this.createImagePath(`${this.currentUser.userId}_${avata}`);
      },
      error: (_) => {
        return this.defaultImage;
      }
    });
    return this.defaultImage;
  }

  createImagePath(fileName: string | null | undefined) {
    return `${this.baseUrl}/images/${fileName}`;
  }

  scrollDown() {
    if (this.chatContainer) {
      this.render.setProperty(this.chatContainer.nativeElement, 'scrollTop', this.chatContainer.nativeElement.scrollHeight);
    }
  }
  clearScreen() {
    this.chatMessages = [];
  }

  ngOnDestroy(): void {
    if (this.fileServiceSub)
      this.fileServiceSub.unsubscribe();
  }
}
