// 🔥 베이스 (공통 필드)
export interface IQnaBase {
    id: number;
    rootId: number | null;
    mentionedUserName: string | null;
    title: string | null;
    content: string;
    createdAt: Date;
    modifiedAt: Date | null;
    userId: string;
    pseudonym: string;
    likeCount: number;
    pinOrder: number;
}

// 🔥 목록/답글 응답 (베이스 + 집계 필드)
export interface IQna extends IQnaBase {
    replyCount: number;
    isLikedByMe: boolean;
}

// 🔥 작성 DTO
export interface IQnaCreate {
    parentId?: number | null;
    rootId?: number | null;
    title?: string | null;
    content: string;
}
