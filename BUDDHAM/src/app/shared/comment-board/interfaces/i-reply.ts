export interface IReply {
  id: number | string;
  rootId?: number | string | null;       // 🔥 추가! 대댓글 처리 핵심
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
