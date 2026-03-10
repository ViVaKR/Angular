import { PinOrder } from "../enums/pin-order";

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
    avatar?: string;
    likeCount: number;
    pinOrder?: PinOrder | null;
}

// 🔥 목록/답글 응답 (베이스 + 집계 필드)
export interface IQna extends IQnaBase {
    parentId?: number | null;
    replyCount: number;
    isLikedByMe: boolean;
}

// 🔥 작성 DTO
export interface IQnaCreate {
    parentId?: number | null;
    rootId?: number | null;
    title?: string | null;
    content: string;
    mentionedUserName?: string | null;
    pinOrder?: PinOrder | PinOrder.NotFixed

}

export interface IQnaCreateOrUpdate {
    id: number;
    title?: string | null;
    content: string;
    pinOrder?: PinOrder | null;
}

// Admin 전용
export interface IQnaPinOrder {
    id: number;
    pinOrder?: PinOrder | null;
}
