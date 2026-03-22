import { ContentCategory } from "@app/core/enums/content-category";
import { PinOrder } from "@app/core/enums/pin-order";
import { PostType } from "@app/core/enums/post-type";

export interface IScriptureTranscriptionBase {
    id: number;
    rootId?: number | null;

    sequence: number;
    mentionedUserName?: string | null;
    userId: string; // 작성자 ID

    pseudonym?: string | null;
    avatar?: string | null;

    title: string; // 제목
    content?: string; // 내용
    commentary?: string; // 메모
    tags?: string[]; // 태그 (CSV, JSON 문자열)
    Category: TranscriptionCategory; // 사경/번역/주석/자유글

    postType: PostType; // 출판상태 (초안/검토/게시/숨김)
    isVerified: boolean; // 전문가 검증 여부 (사경 품질 관리용)
    createdAt: Date; // 생성일
    modifiedAt?: Date | null; // 수정일
    likeCount: number; // 좋아요 수

    transcriptionCount: number;
    pinOrder?: PinOrder | null;

    language: string; // 사경/번역 시 사용언어 (ko)
    viewCount: number; // 조회 수
}

// 🔥 목록/답글 응답 (베이스 + 집계 필드)
export interface IScriptureTranscription extends IScriptureTranscriptionBase {
    parentId?: number | null;
    replyCount?: number | null;
    isLikedByMe?: boolean | null;
}

// 🔥 작성 DTO
export interface IScriptureTranscriptionCreateOrUpdate {
    parentId?: number | null;
    rootId?: number | null;
    mentionedUserName?: string | null;
    scriptureMasterId: number; //long
    userId: string; // 작성자 ID
    authorPseudonum?: string // 필명
    title: string; // 제목
    content?: string; // 내용
    transcription: string; // 본문
    commentary?: string; // 메모
    constentCategory: ContentCategory; // 사경/번역/주석/자유글
    language: string; // 사경/번역 시 사용언어 (ko)
    tags?: string; // 태그 (CSV, JSON 문자열)
    postType: PostType; // 출판상태 (초안/검토/게시/숨김)
    isVerified: boolean; // 전문가 검증 여부 (사경 품질 관리용)
    createdAt: Date; // 생성일
    updatedAt?: Date; // 수정일
    viewCount: number; // 조회 수
    likeCount: number; // 좋아요 수
    pinOrder?: PinOrder | null;
}

export interface IScriptureTranscriptionLike {

    id: number;
    scriptureTranscriptionId: number;

}

// 🔥 작성 DTO
export interface IReplyCreate {
    parentId?: number | null;
    rootId?: number | null;
    title?: string | null;
    content: string;
    mentionedUserName?: string | null;
    pinOrder?: PinOrder | PinOrder.NotFixed
}

// Admin 전용
export interface IScriptureTranscriptionPinOrder {
    id: number;
    pinOrder?: PinOrder | null;
}
