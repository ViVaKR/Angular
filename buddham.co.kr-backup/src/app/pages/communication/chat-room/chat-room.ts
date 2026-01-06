import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, ElementRef, Inject, inject, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '@app/core/services/chat/chat-service';
import { ChatStore } from '@app/core/services/chat/chat-store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HubConnectionState } from '@microsoft/signalr';
import { AlertService } from '@app/core/services/alert-service';
import { IBottomSheet } from '@app/core/interfaces/i-bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { UserStore } from '@app/core/services/user-store';
import { environment } from '@env/environment.development';
import { IChatMessage } from '@app/core/interfaces/i-chat-message';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat-room',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './chat-room.html',
  styleUrl: './chat-room.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatRoom implements OnInit, AfterViewInit {

  title = "Chat Room";
  baseUrl = environment.apiUrl;

  private route = inject(ActivatedRoute);
  private svc = inject(ChatService);
  private store = inject(ChatStore);
  private alertService = inject(AlertService);
  private userStore = inject(UserStore);

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  room = this.store.room;
  roomId = signal<string | null>(null);
  roomName = signal<string | null>(null);

  user = toSignal(this.userStore.user$, { initialValue: null });
  usr = computed(() => { return this.user() });

  userLeftMessage = this.store.userLeftMessage;
  userLeftMsg = computed(() => {
    return this.userLeftMessage();
  });

  state = computed(() => this.svc.conn.state());
  isConnected = computed(() => this.state() === HubConnectionState.Connected);

  formBuilder = inject(FormBuilder);
  avatar = this.userStore.getAavatar();

  joinedMessage = this.store.currentParticipants;
  joinedMsg = computed(() => {
    // 현재 참여자 목록 가져오기
    return this.joinedMessage()
  });

  userList = toSignal(this.store.participants$, { initialValue: null });

  allMessages = computed(() => {
    const current = this.store.currentMessges();
    const history = this.store.currentHistory();

    // 중복 제거를 위한 Map (id 가 있는 경우)
    const messageMap = new Map<string, IChatMessage>();

    // 히스토리 먼저 추가
    history.forEach(msg => {
      const key = msg.id || `${msg.userId}-${msg.sentAt}`;
      messageMap.set(key, msg);
    });

    // 현재 메시지 추가/덮어쓰기
    current.forEach(msg => {
      const key = msg.id || `${msg.userId}-${msg.sentAt}`;
      messageMap.set(key, msg);
    });

    // 시간순 정렬
    return Array.from(messageMap.values())
      .sort((a, b) => {
        const dateA = new Date(a.sentAt).getTime();
        const dateB = new Date(b.sentAt).getTime();
        return dateA - dateB;
      });
  });

  form: FormGroup = this.formBuilder.group({
    message: ['', Validators.required]
  });

  currentParticipants = this.store.currentParticipants;

  participants = computed(() => {
    return this.currentParticipants();
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    effect(() => {
      this.currentParticipants = this.store.currentParticipants;
    });

    const roomIdParam = this.route.snapshot.paramMap.get('roomId');
    this.roomId.set(roomIdParam);

    // 메시지가 추가될 때마다 스크롤
    effect(() => {
      const messages = this.allMessages();
      if (messages.length > 0) {
        setTimeout(() => this.scrollToBottom(), 500); // ? 다음 렌더링 사이클에 스크롤 실행
      }
    });
  }

  async ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      // ✅ 1. 연결 확인
      await this.svc.ensureConnected();

      // ✅ 2. 방 목록 가져오기
      if (this.store.rooms().length === 0) {
        await this.svc.getRooms();
      }

      // ✅ 3. 현재 방 찾기
      const currentRoom = this.store.rooms().find(x => x.id === this.roomId());

      if (!currentRoom) {
        this.roomName.set('방을 찾을 수 없음');
        this.store.error.set('존재하지 않는 방입니다.');
        await this.router.navigate(['/Communication']);
        return;
      }

      this.roomName.set(currentRoom.roomName);

      // 4. 현재 참여자 목록 먼저가져오기 (서버 기준 체크)
      await this.svc.getRoomParticipants(this.roomId()!);

      // 잠시 대기 (store 업데이트 시간 벌기)
      await new Promise(resolve => setTimeout(resolve, 300));

      const participants = computed(() => {
        return this.store.currentParticipants();
      });
      const myUserId = this.usr()?.id;
      const isAlreadyInRoom = participants().some(p => p.userId === myUserId);

      if (!isAlreadyInRoom) {
        console.log('방에 참여하지 않아 입장 시도:', this.roomId());
        const success = await this.svc.joinRoom(this.roomId()!);

        if (!success) {
          this.store.error.set('방 입장에 실패했습니다.');
          await this.router.navigate(['/Communication']);
          return;
        } else {
          // 이미 참여 중이었으면 store에 반영
          console.log('이미 참여 중인 방 입장 성공:', this.roomId());
          this.store.setCurrentRoom(this.roomId()!);
        }

        // 6. 메시지 히스토리 로드
        await this.svc.loadMessageHistory(this.roomId()!, 1);

      } else {
        // 이미 참여 중이면 store만 업데이트
        this.store.setCurrentRoom(this.roomId()!);
      }

      // 메시지 히스토리 로드
      await this.svc.loadMessageHistory(this.roomId()!, 1);
    } catch (err) {
      console.error('방 정보 로딩 실패:', err);
      this.roomName.set('-');
      this.store.error.set('방 정보 로딩에 실패했습니다.');
      await this.router.navigate(['/Communication']);
    }

    console.log(this.currentParticipants());
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => this.scrollToBottom(), 500);
  }

  resetForm() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => {
      control.markAsPristine();
      control.markAsUntouched();
      control.setErrors(null);
    });
  }

  // ✅ 하나의 스크롤 메서드로 통합
  private scrollToBottom(): void {
    if (!this.chatContainer?.nativeElement) return;

    // requestAnimationFrame
    try {
      const element = this.chatContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('스크롤 오류:', err);
    }
  }

  getAvatar(userId: string, avatar: string) {
    if (avatar === 'default.png') {
      return `${this.baseUrl}/Images/lotus.webp`;
    }

    const avatarUrl = `${this.baseUrl}/Images/avatars/${userId}/${avatar}`;
    return avatarUrl;
  }
  getUserAvatar(sub: any) {
    console.log('Get UserId =====>', sub);

    // if (avatar === 'default.png') {
    //   return `${this.baseUrl}/Images/lotus.webp`;
    // }
    // const avatarUrl = `${this.baseUrl}/Images/avatars/${userId}/${avatar}`;
    // return avatarUrl;
  }
  router = inject(Router);

  async leaveRoom() {
    if (this.roomId() === null) {
      await this.router.navigate(['/Communication']);
    }
    await this.svc.leaveRoom(this.roomId()!);
    await this.router.navigate(['/Communication']);
  }

  async onSubmit(event: Event) {
    event?.preventDefault();
    if (this.form.invalid) return;
    const message = this.form.get('message')?.value;
    try {
      await this.svc.sendMessage(this.roomId()!, message);
      this.resetForm();
    } catch (err: any) {
      const msg: IBottomSheet[] = [
        {
          title: '메시지 전송 오류',
          content: err
        }]
      this.alertService.openSheet(msg);
    }
  }
}

/*
async ngOnInit() {
  const roomIdParam = this.route.snapshot.queryParamMap.get('roomId');
  console.log(roomIdParam);
}

ngOnInit() {
  this.route.queryParamMap.subscribe(params => {
    const roomId = params.get('roomId');
    console.log(roomId);
  });
}

{
  path: 'ChatRoom/:roomId',
  component: ChatRoomComponent
}
<button
  [routerLink]="['/ChatRoom', room.roomId.replaceAll('-', '')]"
  matButton="filled">
  입장
</button>

queryParams로 보냈으면 queryParamMap으로 읽어야 한다
paramMap은 /path/:id 전용이다

<button
  [routerLink]="['ChatRoom']"
  [queryParams]="{ roomId: room.roomId.replaceAll('-', '') }"
  matButton="filled">
  입장
</button>
/ChatRoom?roomId=12345
/ChatRoom/12345


const roomIdParam = this.route.snapshot.paramMap.get('roomId');


| 상황                    | 추천                    |
| --------------------- | --------------------- |
| 필수 식별자 (방 ID, 게시글 ID) | ✅ route param         |
| 옵션, 필터, 상태            | ✅ query param         |
| SignalR 방 입장          | **route param 추천** 👍 |


    // if (!roomIdParam) {
    //   // TODO: ChatRoom/123 특정방 접근
    //   this.router.navigate(['lobby']);
    //   return;
    // }

    // const roomId = parseInt(roomIdParam, 10);

    // if (isNaN(roomId)) {
    //   this.router.navigate(['/lobby']);
    //   return;
    // }

    // this.roomId.set(roomId);

    // 채팅 이벤트 리스너 등록
*/
