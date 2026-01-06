// chat-event-service.ts
import { inject, Injectable, NgZone } from '@angular/core';
import { ChatStore } from './chat-store';

import { ChatConnectionService } from './chat-connection-service';
import { ChatMethod } from '@app/shared/contants/chat-method';
import { IChatRoom } from '@app/core/interfaces/i-chat-room';
import { IChatMessage } from '@app/core/interfaces/i-chat-message';
import { IRoomParticipant } from '@app/core/interfaces/i-room-participant';
import { IPagedResult } from '@app/core/interfaces/i-paged-result';

@Injectable({ providedIn: 'root' })
export class ChatEventService {

  private registered = false;
  private conn = inject(ChatConnectionService);
  private store = inject(ChatStore);
  private zone = inject(NgZone);

  // 헬퍼: None 내에서 핸들러 실행
  private warpHander<T>(handler: (data: T) => void) {
    return (data: T) => {
      this.zone.run(() => handler(data));
    };
  }

  // 이벤트 정리
  unregisterEvents() {
    const hub = this.conn.hub;
    if (!hub) return;

    // 모든 ChatMethod Event 제거
    Object.values(ChatMethod).forEach(method => hub.off(method));
    this.registered = false;
  }

  registerGlobalEvents() {
    if (this.registered) {
      console.warn('이벤트가 이미 등록되어 있습니다.');
      return;
    }

    const hub = this.conn.hub;

    if (!hub) {
      throw new Error('HubConnection이 초기화되지 않았습니다.');
    }

    // 기존 모든 이벤트 핸들러 제거 후 재등록
    this.unregisterEvents();

    // ==================== 연결 ====================
    hub.on(ChatMethod.Connected, (connectionId: string) => {
      this.store.systemMessage.set(`서버에 연결되었습니다, connectionId ${connectionId}`);
    });

    // ==================== 방 목록 ====================
    // * 방 목록 수신
    hub.on(ChatMethod.ReceiveRooms, (rooms: IChatRoom[]) => this.store.setRooms(rooms));

    // * 현재 방 정보 수신
    hub.on(ChatMethod.ReceiveRoomInfo, (room: IChatRoom) => {
      this.store.setRoom(room);
      this.store.setCurrentRoom(room.id);
    });

    // * 생성자 방생성 수신 (return room)
    hub.on(ChatMethod.RoomCreated, (room: IChatRoom) => {
      this.store.room.set(room);
      this.store.setCurrentRoom(room.id);
    });

    // * 방 삭제
    hub.on(ChatMethod.RoomDeleted, (roomId: string) => {
      this.store.removeRoom(roomId);

      // 현재 있던 방이 삭제되면 로비로
      if (this.store.currentRoomId() === roomId) {
        this.store.clearCurrentRoom();
      }
    });

    // ==================== 방 입장/퇴장 ====================
    /**
     * ! 방 참여
     */
    hub.on(ChatMethod.JoinedRoom, (data: { room: IChatRoom; message: string }) => {
      this.store.setCurrentRoom(data.room.id);
      this.store.joinedMessage.set(data.message);
    });

    // 사용자 입장
    hub.on(ChatMethod.UserJoined, (data: IRoomParticipant) => {
      this.store.addParticipant(data.roomId, data);
      console.log(`${data.userName}님이 입장했습니다.`);
      this.store.systemMessage.set(`${data.userName}님이 입장했습니다.`);
      this.store.joinedMessage.set(`${data.userName}님이 입장했습니다.`);
    });

    // * 사용자 퇴장
    hub.on(ChatMethod.UserLeft, (data: { userName: string; userId: string, roomId: string }) => {
      this.store.removeParticipants(data.roomId, data.userId);
      this.store.systemMessage.set(`${data.userName}님이 퇴장했습니다.`);
      this.store.userLeftMessage.set(`${data.userName}님이 퇴장하셨습니다. `);
    });

    // ==================== 메시지 ====================

    // * 메시지 수신
    hub.on(ChatMethod.ReceiveMessage, (message: IChatMessage) => {
      this.store.addMessage(message.roomId, message);
    });

    // * 메시지 히스토리
    hub.on(ChatMethod.ReceiveMessageHistory, (result: IPagedResult<IChatMessage>) => {
      this.store.setMessageHistory(result.items);
    });

    // 메시지 삭제
    hub.on(ChatMethod.MessageDeleted, (messageId: string) => {
      this.store.removeMessage(messageId);
    });

    // ==================== 참여자 ====================

    hub.on(ChatMethod.ReceiveParticipants, (data: {
      roomId: string; participants: IRoomParticipant[];
    }) => {
      this.zone.run(() => {
        this.store.setParticipants(data.roomId, data.participants);
      });

    });

    // ==================== 에러 ====================

    hub.on(ChatMethod.Error, (error: string) => {
      this.store.error.set(error);
    });
    this.registered = true;
    console.log('Chat 이벤트 등록 완료');
  }

}
