export interface IReply {
  id: number | string;
  parentId?: number | string | null;
  userId?: number | string;
  avatar?: string | null;
  pseudonym: string;
  mentionedUserName?: string | null;
  content: string;
  createdAt: string | Date;
  isLikedByMe: boolean;
  likeCount: number;
  replyCount?: number;
}
