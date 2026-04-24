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
import { AvatarFallback } from "@app/core/directives/avatar-fallback";
import { ScrollTo } from "@app/shared/scroll-to/scroll-to";

@Component({
  selector: 'app-chat-room',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    AvatarFallback,
    ScrollTo
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
  readonly store = inject(ChatStore);
  readonly userStore = inject(UserStore);
  readonly alertService = inject(AlertService);
  readonly router = inject(Router);
  private _injector = inject(Injector);

  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @ViewChild(ScrollTo) scrollToComponent!: ScrollTo;

  room = this.store.room;
  roomId = signal<string | null>(null);
  roomName = signal<string | null>(null);

  hasMore = this.store.hasMoreMessages;
  isLoadingMore = this.store.isLoadingMore;

  user = toSignal(this.userStore.user$, { initialValue: null });
  usr = computed(() => { return this.user() });

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

    // const history = this.store.currentHistory(); // 기존 방식
    const history = this.store.currentHistoryByRoom(); // 무한 스크롤 용

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
    return Array.from(messageMap.values()).sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());
  });

  form: FormGroup = this.formBuilder.group({
    message: ['', Validators.required]
  });

  currentParticipants = this.store.currentParticipants;

  participants = computed(() => {
    return this.currentParticipants();
  });

  constructor() {

    const roomIdParam = this.route.snapshot.paramMap.get('roomId');
    this.roomId.set(roomIdParam);

    // 메시지가 추가될 때마다 스크롤
    effect(() => {
      const messages = this.allMessages();
      if (messages.length > 0) {
        setTimeout(() => this.scrollToBottom(), 500);
      }
    });

  }

  private isInitializing = false;

  async ngOnInit() {

    if (this.isInitializing) return;

    this.isInitializing = true;

    try {
      // ✅ 1. 연결 및 기초 데이터 확보
      await this.svc.ensureConnected();

      // ✅ 2. 방 목록 가져오기
      if (this.store.rooms().length === 0) {
        await this.svc.getRooms();
        // rooms 가 채워질 때가지 풀링
        await this.waitForRooms();
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
      this.store.setCurrentRoom(this.roomId()); // Store에 ID 먼저 확실히 박기

      // 4. 현재 참여자 목록 가져오기
      await this.svc.getRoomParticipants(this.roomId()!);

      const success = await this.svc.joinRoom(this.roomId()!);
      if (success) {
        await this.svc.loadMessageHistory(this.roomId()!, 1);
      } else {
        throw new Error('방 입장에 실패했습니다.');
      }

    } catch (err) {
      this.roomName.set('-');
      this.store.error.set('방 정보 로딩에 실패했습니다.');
      await this.router.navigate(['/Communication']);
    }
  }

  async ngAfterViewInit(): Promise<void> {
    setTimeout(() => this.scrollToBottom(), 500);
  }

  async loadMore(): Promise<void> {
    if (this.isLoadingMore() || !this.hasMore()) return;

    const nextPage = this.store.currentPage() + 1;

    const container = this.chatContainer.nativeElement;
    const preScrollHeight = container.scrollHeight; // 현재 높이 저장

    this.store.isLoadingMore.set(true);
    await this.svc.loadMessageHistory(this.roomId()!, nextPage);

    setTimeout(() => {
      // 추가된 높이만큼 scrollTop 보정 → 사용자 위치 유지
      container.scrollTop = container.scrollHeight - preScrollHeight;
    }, 100);
  }

  private async waitForRooms(timeoutMs = 5000): Promise<void> {
    const start = Date.now();
    while (this.store.rooms().length === 0) {
      if (Date.now() - start > timeoutMs) break;
      await new Promise(r => setTimeout(r, 50));
    }
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

  private scrollToBottom(): void {
    if (!this.chatContainer?.nativeElement) return;
    const element = this.chatContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
  }

  getAvatar(userId: string, avatar: string) {
    if (avatar === 'default.png') {
      return this.userStore.defaultAvatar;
    }

    const avatarUrl = `${this.baseUrl}/Images/avatars/${userId}/${avatar}`;
    return avatarUrl;
  }
  public avatarError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.userStore.defaultAvatar;
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
