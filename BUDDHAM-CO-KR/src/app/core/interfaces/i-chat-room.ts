import { IChatMessage } from "./i-chat-message";
import { IRoomParticipant } from "./i-room-participant";

export interface IChatRoom {
  id: string;  // Guid
  roomName: string;
  description?: string;
  ownerId: string;
  ownerName: string;
  messages?: IChatMessage[];
  createdAt: Date;
  isActive: boolean;
  participants?: IRoomParticipant[];
  currentParticipants: number;
}
