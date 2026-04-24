import { IChatRoom } from "./i-chat-room";
import { IChatUser } from "./i-chat-user";

export interface IJoinedRoomResponse {
  room: IChatRoom;
  users: IChatUser[];
  message: string;
}
