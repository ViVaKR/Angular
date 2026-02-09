import {
  afterNextRender,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '@app/core/services/chat/chat-service';
import { ChatStore } from '@app/core/services/chat/chat-store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/core/services/alert-service';
import { IBottomSheet } from '@app/core/interfaces/i-bottom-sheet';
import { UserStore } from '@app/core/services/user-store';
import { environment } from '@env/environment.development';
import { IChatMessage } from '@app/core/interfaces/i-chat-message';
import { toSignal } from '@angular/core/rxjs-interop';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { HubConnectionState } from '@microsoft/signalr';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-chat-room',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
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
  router = inject(Router);
  private _injector = inject(Injector);
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

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
  avatar = this.userStore.avatar();

  joinedMessage = this.store.currentParticipants;
  joinedMsg = computed(() => {
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

  constructor() {

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
        const success = await this.svc.joinRoom(this.roomId()!);
        if (!success) {
          this.store.error.set('방 입장에 실패했습니다.');
          await this.router.navigate(['/Communication']);
          return;
        } else {
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
      this.roomName.set('-');
      this.store.error.set('방 정보 로딩에 실패했습니다.');
      await this.router.navigate(['/Communication']);
    }
  }

  async ngAfterViewInit(): Promise<void> {
    setTimeout(() => this.scrollToBottom(), 500);
  }
  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
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
      return `lotus.webp`;
    }

    const avatarUrl = `${this.baseUrl}/Images/avatars/${userId}/${avatar}`;
    return avatarUrl;
  }

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
