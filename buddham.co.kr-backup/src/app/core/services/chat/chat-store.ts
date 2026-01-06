import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { IChatMessage } from '@app/core/interfaces/i-chat-message';
import { IChatRoom } from '@app/core/interfaces/i-chat-room';
import { IRoomParticipant } from '@app/core/interfaces/i-room-participant';
import { Subject } from 'rxjs';
import { BrowserService } from '../browser-service';

@Injectable({ providedIn: 'root' })
export class ChatStore {

  browserService = inject(BrowserService);;

  // * 방 전체목록
  public rooms = signal<IChatRoom[]>([]);

  // * 현재 방 정보
  public room = signal<IChatRoom | null>(null);

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
  });

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

  public userLeftMessage = signal<string | null>(null);
  public error = signal<string | null>(null);
  public loading = signal<boolean>(false);

  constructor() {
    if (this.browserService.isBrowser) {
      const savedRoomId = localStorage.getItem('chat_current_room');
      if (savedRoomId) {
        this.currentRoomId.set(savedRoomId);
      }
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
    if (this.browserService.isBrowser && roomId) {
      localStorage.setItem('chat_current_room', roomId);
    }
  }

  clearCurrentRoom() {
    this.currentRoomId.set(null);
    if (this.browserService.isBrowser) {
      localStorage.removeItem('chat_current_room');
    }
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
   * @param items chat messages
   */
  setMessageHistory(items: IChatMessage[]) {
    this.messageHistory.set(items);
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
    this.participantsByRoom.update(map => {
      map.set(roomId, participants);

      this._participants.next(map.get('roomId')!);
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
