// src/app/shared/constants/chat-method.ts
export class ChatMethod {
  // 연결 관련
  static readonly Connected = 'Connected';
  static readonly Disconnected = 'Disconnected';

  // 방 관련
  static readonly GetRooms = 'GetRooms';
  static readonly ReceiveRooms = 'ReceiveRooms';
  static readonly ReceiveRoomInfo = 'ReceiveRoomInfo';
  static readonly CreateRoom = 'CreateRoom';
  static readonly RoomCreated = 'RoomCreated';
  static readonly DeleteRoom = 'DeleteRoom';
  static readonly RoomDeleted = 'RoomDeleted';

  // 방 참여/퇴장
  static readonly JoinRoom = 'JoinRoom';
  static readonly JoinedRoom = 'JoinedRoom';
  static readonly LeaveRoom = 'LeaveRoom';
  static readonly UserJoined = 'UserJoined';
  static readonly UserLeft = 'UserLeft';

  // 메시지 관련
  static readonly SendMessage = 'SendMessage';
  static readonly ReceiveMessage = 'ReceiveMessage';

  static readonly GetRoomMessages = 'GetRoomMessages';
  static readonly ReceiveMessageHistory = 'ReceiveMessageHistory';
  static readonly DeleteMessage = 'DeleteMessage';
  static readonly MessageDeleted = 'MessageDeleted';

  // 참여자 관련
  static readonly GetRoomParticipants = 'GetRoomParticipants';
  static readonly ReceiveParticipants = 'ReceiveParticipants';

  // ChatInternalMethod
  static readonly GetPseudonymName = 'GetPseudonymName';
  static readonly GetToken = 'GetToken';
  // 에러
  static readonly Error = 'Error';
}
