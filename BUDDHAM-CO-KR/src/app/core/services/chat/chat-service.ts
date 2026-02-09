import { Injectable, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import { environment } from '@env/environment';
import { UserStore } from '@services/user-store';
import { ChatConnectionService } from '@services/chat/chat-connection-service';
import { ChatEventService } from '@services/chat/chat-event-service';
import { IUser } from '@app/core/interfaces/i-user';
import { IChatUser } from '@app/core/interfaces/i-chat-user';
import { ChatMethod } from '@app/shared/contants/chat-method';
import { ICreateRoomRequest } from '@app/core/interfaces/i-create-room-request';
import { IChatMessage } from '@app/core/interfaces/i-chat-message';
import { v4 as uuidv4 } from 'uuid';
import { ChatStore } from './chat-store';

@Injectable({ providedIn: 'root' })
export class ChatService {

  private readonly chatUrl = `${environment.chatUrl}/chatHub`;
  private bootstrapped = false;
  private connecting?: Promise<void>;
  private intentionalDisconnect = false;

  user?: Signal<IUser | null>;

  constructor(
    public conn: ChatConnectionService,
    private userStore: UserStore,
    public events: ChatEventService,
    private store: ChatStore
  ) {
    this.user = toSignal<IUser | null>(this.userStore.user$, { initialValue: null });
    this.conn.init(this.chatUrl);
  }

  // ==================== 초기화 ====================

  async bootstrap(): Promise<void> {
    if (this.bootstrapped) return;

    const user = this.chatUser();
    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }

    await this.conn.init(this.chatUrl);
    this.events.registerGlobalEvents();
    this.setupReconnection();
    await this.conn.connect();

    this.bootstrapped = true;
    this.intentionalDisconnect = false;
  }

  // ==================== 연결 관리 ====================

  async connect(): Promise<void> {
    // 플래그 초기화
    this.intentionalDisconnect = false;
    this.conn.setIntentionalDisconnect(false);

    // 연결 시도
    await this.ensureConnected();
  }

  async disconnect(): Promise<void> {
    // 플래그 설정 (먼저!)
    this.intentionalDisconnect = true;
    this.conn.setIntentionalDisconnect(true);

    // 연결 끊기
    await this.conn.disconnect();

    // 상태 초기화
    this.bootstrapped = false;
    this.connecting = undefined;
  }

  async ensureConnected(): Promise<void> {
    if (this.conn.state() === HubConnectionState.Connected) return;

    if (this.intentionalDisconnect) {
      throw new Error('서버 연결이 종료된 상태입니다. 먼저 연결해주세요.');
    }

    if (this.connecting) {
      await this.connecting;
      return;
    }

    this.connecting = this.doConnect();

    try {
      await this.connecting;
    } catch (err) {
      throw err;
    } finally {
      this.connecting = undefined;
    }
  }

  // ==================== 재연결 핸들러 ====================

  private setupReconnection(): void {
    this.conn.hub?.onclose((error) => {
      if (this.intentionalDisconnect) {
        this.bootstrapped = false;
        this.store.systemMessage.set('서버 연결이 종료되었습니다.');
        return;
      }
      // 비정상 연결 끊김
      this.bootstrapped = false;
      this.store.systemMessage.set('서버와의 연결이 종료되었습니다. 재연결을 시도합니다...');
    });
  }

  // ==================== 방 관리 ====================
  async getRooms(): Promise<void> {
    await this.ensureConnected();
    await this.hub.invoke(ChatMethod.GetRooms);
  }

  async getRoomInfo(roomId: string): Promise<void> {
    await this.ensureConnected();
    await this.hub.invoke(ChatMethod.ReceiveRoomInfo, roomId);
  }

  async createRoom(request: ICreateRoomRequest): Promise<void> {
    await this.ensureConnected();
    await this.hub.invoke(ChatMethod.CreateRoom, request.roomName, request.description);
  }

  async deleteRoom(roomId: string): Promise<boolean> {
    await this.ensureConnected();
    return await this.hub.invoke<boolean>(ChatMethod.DeleteRoom, roomId);
  }

  async joinRoom(roomId: string): Promise<boolean> {
    await this.ensureConnected();
    return await this.hub.invoke<boolean>(ChatMethod.JoinRoom, roomId);
  }

  async leaveRoom(roomId: string): Promise<void> {
    await this.ensureConnected();
    await this.hub.invoke(ChatMethod.LeaveRoom, roomId);
  }

  // ==================== 메시지 ====================

  async sendMessage(roomId: string, content: string): Promise<void> {
    await this.ensureConnected();

    const usr = this.chatUser();
    if (!usr) throw new Error('사용자 정보가 없습니다.');
    if (!roomId || !content) throw new Error('방 번호 또는 내용이 없습니다.');

    const msg: IChatMessage = {
      id: uuidv4(),
      roomId: roomId,
      userId: usr.userId,
      userName: usr.userName,
      avatar: usr.avatar,
      content: content,
      sentAt: new Date()
    };

    await this.hub.invoke(ChatMethod.SendMessage, msg);
  }

  async loadMessageHistory(roomId: string, page: number = 1, pageSize: number = 50): Promise<void> {
    try {
      await this.hub.invoke(ChatMethod.GetRoomMessages, roomId, page, pageSize);
    } catch (err: any) {
      console.error('메시지 로드 실패:', err);
    }
  }

  async deleteMessage(messageId: string): Promise<void> {
    await this.ensureConnected();
    await this.hub.invoke(ChatMethod.DeleteMessage, messageId);
  }

  // ==================== 참여자 ====================

  async getRoomParticipants(roomId: string): Promise<void> {
    await this.ensureConnected();
    await this.hub.invoke(ChatMethod.GetRoomParticipants, roomId);
  }

  async getPseudonymName(): Promise<string> {
    // 연결되지 않은 상태면 기본값 반환
    if (this.intentionalDisconnect || !this.isConnected) {
      return '게스트';
    }

    await this.ensureConnected();
    return await this.hub.invoke(ChatMethod.GetPseudonymName);
  }

  async GetToken(): Promise<void> {
    // 연결되지 않은 상태면 무시
    if (this.intentionalDisconnect || !this.isConnected) return;
    await this.ensureConnected();
    await this.hub.invoke(ChatMethod.GetToken);
  }

  // ==================== 유틸리티 ====================
  get isConnected(): boolean {
    return this.conn.state() === HubConnectionState.Connected;
  }

  get currentUser(): IChatUser | null {
    return this.chatUser();
  }

  isIntentionallyDisconnected(): boolean {
    return this.intentionalDisconnect;
  }

  // ==================== Private 헬퍼 ====================

  private async doConnect(): Promise<void> {
    if (!this.bootstrapped) {
      await this.bootstrap();
    } else {
      await this.conn.connect();
    }
  }

  private chatUser = computed<IChatUser | null>(() => {
    if (!this.user) return null;
    const usr = this.user();
    if (!usr) return null;

    return {
      userId: usr.id,
      userName: usr.pseudonym,
      avatar: usr.avatar
    };
  });

  private get hub(): HubConnection {
    if (!this.conn.hub) {
      throw new Error('SignalR hub is not initialized');
    }
    return this.conn.hub;
  }
}
