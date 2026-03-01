import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { IChatMessage } from '@app/core/interfaces/i-chat-message';
import { IChatRoom } from '@app/core/interfaces/i-chat-room';
import { IRoomParticipant } from '@app/core/interfaces/i-room-participant';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatStore {

  // * 방 전체목록
  public rooms = signal<IChatRoom[]>([]);

  // * 현재 방 정보
  public room = signal<IChatRoom | null>(null);

  // * Cursor
  public hasMoreMessages = signal<boolean>(false);
  public isLoadingMore = signal<boolean>(false);
  public currentPage = signal<number>(1); // 현재 페이지
  public totalPages = signal<number>(1); // 전체 페이지

  // * 현재 선택된 방
  public currentRoomId = signal<string | null>(null);
  public currentRoom = computed(() => {
    const roomId = this.currentRoomId();
    return roomId ? this.rooms().find(x => x.id === roomId) : null;
  })

  // * 메시지 (방별로 저장)
  private messageByRoom = signal<Map<string, IChatMessage[]>>(new Map());
  public currentMessges = computed(() => {
    const roomId = this.currentRoomId();
    return roomId ? this.messageByRoom().get(roomId) || [] : [];
  });

  // * 지난 메시지 목록
  private messageHistory: WritableSignal<IChatMessage[] | null> = signal<IChatMessage[] | null>([]);
  public currentHistory = computed(() => {
    const roomId = this.currentRoomId();
    return roomId ? this.messageHistory()?.filter(x => x.roomId == roomId) || [] : [];
    // return roomId ? this.messageHistory().get(roomId) || [] : [];
  });

  // * 방별로 분리 해서 저장 (currentMessages 패턴)
  private messageHistoryByRoom = signal<Map<string, IChatMessage[]>>(new Map());
  public currentHistoryByRoom = computed(() => {
    const roomId = this.currentRoomId();
    return roomId ? this.messageHistoryByRoom().get(roomId) || [] : [];
  })

  // * 참여자 (방별로 저장)
  private participantsByRoom = signal<Map<string, IRoomParticipant[]>>(new Map());
  public currentParticipants = computed(() => {
    const roomId = this.currentRoomId();
    return roomId ? this.participantsByRoom().get(roomId) || [] : [];
  });

  private _participants = new Subject<IRoomParticipant[] | null>();
  public participants$ = this._participants.asObservable();

  // * 시스템 메시지
  public systemMessage = signal<string | null>(null);
  public joinedMessage = signal<string | null>(null);

  public error = signal<string | null>(null);
  public loading = signal<boolean>(false);

  constructor() {
    const savedRoomId = localStorage.getItem('chat_current_room');
    if (savedRoomId) {
      this.currentRoomId.set(savedRoomId);
    }
  }

  // * ==================== 방 관리 ==================== *

  setRooms(rooms: IChatRoom[]) {
    this.rooms.set(rooms);
  }

  setRoom(room: IChatRoom) {
    this.room.set(room);
  }

  addRoom(room: IChatRoom) {
    this.rooms.update(rooms => [...rooms, room]);
  }

  removeRoom(roomId: string) {
    this.rooms.update(rooms => rooms.filter(x => x.id !== roomId));
  }

  setCurrentRoom(roomId: string | null) {
    this.currentRoomId.set(roomId);
    if (roomId) {
      localStorage.setItem('chat_current_room', roomId);
    }
  }

  clearCurrentRoom() {
    this.currentRoomId.set(null);
    localStorage.removeItem('chat_current_room');
  }

  // ==================== 메시지 관리 ====================
  addMessage(roomId: string, message: IChatMessage) {
    this.messageByRoom.update(map => {
      const messages = map.get(roomId) || [];
      map.set(roomId, [...messages, message]);
      return new Map(map);
    });
  }

  setMessages(roomId: string, messages: IChatMessage[]) {
    this.messageByRoom.update(map => {
      map.set(roomId, messages);
      return new Map(map);
    });
  }

  /**
   * 채팅 메시지 기록
   */
  setMessageHistory(items: IChatMessage[]) {
    this.messageHistory.set(items);
  }

  /**
   * 채팅 메시지 기록
   * 무한 스크롤
   * @param roomId
   * @param items
   */
  setMessageHistoryByRoom(roomId: string, items: IChatMessage[]) {
    this.messageHistoryByRoom.update(map => {
      map.set(roomId, items);
      return new Map(map);
    });
  }

  /**
   * 앞에 붙이기
   * 더 불러오기 용
   * @param roomId
   * @param items
   */
  prependMessageHistory(roomId: string, items: IChatMessage[]) {
    this.messageHistoryByRoom.update(map => {
      const current = map.get(roomId) || [];
      map.set(roomId, [...items, ...current]);
      return new Map(map);
    });
  }

  removeMessage(messageId: string) {
    this.messageByRoom.update(map => {
      const newMap = new Map(map);
      for (const [roomId, messages] of newMap) {
        newMap.set(roomId, messages.filter(x => x.id !== messageId));
      }
      return newMap;
    });
  }

  // ==================== 참여자 관리 ====================
  setParticipants(roomId: string, participants: IRoomParticipant[]) {
    if (!roomId) return;
    this.participantsByRoom.update(map => {
      map.set(roomId, participants);
      this._participants.next(map.get(roomId)!);
      return new Map(map);
    })
  }

  // * 참여자 추가 (UserJoined)
  addParticipant(roomId: string, participant: IRoomParticipant) {
    this.participantsByRoom.update(map => {
      const participants = map.get(roomId) || [];
      map.set(roomId, [...participants, participant]);

      return new Map(map);
    });
  }

  removeParticipants(roomId: string, userId: string) {
    this.participantsByRoom.update(map => {
      const participants = map.get(roomId) || [];
      map.set(roomId, participants.filter(x => x.userId !== userId));
      return new Map(map);
    });
  }

  // ==================== 유틸리티 ====================

  reset() {
    this.rooms.set([]);
    this.room.set(null);
    this.currentRoomId.set(null);
    this.messageByRoom.set(new Map());
    this.participantsByRoom.set(new Map());
    this.systemMessage.set(null);
    this.error.set(null);
  }
}
