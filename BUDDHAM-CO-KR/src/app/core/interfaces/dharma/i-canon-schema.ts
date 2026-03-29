import { MainCategoryType } from "@app/core/enums/main-category-type";
import { OriginalLanguage } from "@app/core/enums/original-language";
import { PinOrder } from "@app/core/enums/pin-order";
import { BuddhistTradition } from "@app/core/enums/tradition";
import { IManifestationItem } from "./i-manifestation-item";

// ── 공통 베이스 ──────────────────────────────────────
export interface ICanonSchema {
    rootId?: number | null;
    title: string;
    chineseTitle?: string | null;
    originalTitle?: string | null;
    originalLanguage: OriginalLanguage; // Enum 필요
    category: MainCategoryType;        // Enum 필요
    tradition?: BuddhistTradition | null;      // Enum 필요
    author?: string | null;
    translator?: string | null;
    abbreviation?: string | null;
    details?: string | null;
    structureDescription?: string | null;
    coverImageUrl?: string | null;
    manifestation?: IManifestationItem[] | null;
    attachment?: string | null;
    hierarchyInfo?: Record<string, string> | null; // Dictionary<string, string> 대응
    absoluteOrder: number;
}

/**
 * [View] 중생들에게 보여지는 나툼의 모습 (Response용)
 */
export interface ICanonView extends ICanonSchema {
    id: number;
    parentId?: number | null; // 학슬 댓글 계층
    mentionedUserName?: string | null;

    userId: string;
    pseudonym: string;
    avatar?: string;

    likeCount: number;
    replyCount: number; // 학술 댓글 수
    isLikedByMe: boolean;
    createdAt: string | Date; // ISO 8601 문자열
    modifiedAt?: string | Date;
}

// ── Create ───────────────────────────────────────────
export interface ICanonEntry extends ICanonSchema {
    parentId?: number | null;
    pinOrder: PinOrder; // Admin 만 입력 가능
    mentionedUserName?: string;
    location?: { x: number; y: number } | null;
}

// ── Update ───────────────────────────────────────────
export interface ICanonPatch extends ICanonSchema {
    id: number;
    pinOrder: PinOrder;
}

export interface ICanonCreateOrUpdate extends ICanonSchema {
    id?: number;
    parentId?: number | null;
    pinOrder: PinOrder;
    location?: { x: number; y: number } | null;
}

// ── Admin 전용 고정순서 ──────────────────────────────
export interface ICanonPinOrder {
    id: number;
    pinOrder: PinOrder;
}

// ── 학술 댓글 작성 (IQnaCreate 패턴) ────────────────
export interface ICanonReplyCreate {
    parentId: number;
    rootId: number;
    title?: string | null;
    content: string;              // 학술 의견 본문
    mentionedUserName?: string | null;
    pinOrder?: PinOrder;
}
