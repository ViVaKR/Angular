import { PinOrder } from "@app/core/enums/pin-order";
import { IManifestationItem } from "./i-manifestation-item";

// ── 공통 베이스 ──────────────────────────────────────
// --- 2. 입력 공통 필드 (생성/수정 공통)
export interface ICanonSchema {

    title: string;
    chineseTitle?: string | null;
    originalTitle?: string | null;
    majorCategoryId: number;
    minorCategoryCode: string;
    scriptureName: string;
    author?: string | null;
    translator?: string | null;
    coverImageUrl?: string | null;
    manifestation?: IManifestationItem[] | null;
    hierarchyInfo?: Record<string, string> | null;
    attachment?: string | null;
    location?: { x: number; y: number } | null;
    details?: string | null;

}

// ── 3. View (서버 → 클라이언트 응답)
export interface ICanonView extends ICanonSchema {
    id: number;
    rootId?: number | null;
    parentId?: number | null;
    mentionedUserName?: string | null;
    userId: string;
    pinOrder: PinOrder;
    replyCount: number;
    likeCount: number;
    isLikedByMe: boolean;
}

// --- 4. Entry (클라이언트 -> 서버 생성)
export interface ICanonEntry extends ICanonSchema {
    id?: number | null;
    rootId?: number | null;
    parentId?: number | null;
    mentionedUserName?: string | null;
    pinOrder: PinOrder; // Admin 만 입력 가능bj
}

// ── 5. Patch (클라이언트 → 서버 수정)
export interface ICanonPatch extends ICanonSchema {
    // id 는 URL 로 전달하므로 불필요
    pinOrder: PinOrder;
}

export interface ICanonCreateOrUpdate {
    parentId?: number | null;
    pinOrder: PinOrder;
    location?: { x: number; y: number } | null;
}

// ── 7. PinOrder 전용 (Admin)
export interface ICanonPinOrder {
    id: number;
    pinOrder: PinOrder;
}

// ── 6. 댓글 생성 전용
export interface ICanonReplyCreate {

    parentId: number;
    rootId: number;
    title?: string | null;
    mentionedUserName?: string | null;
    details?: string | null;

}
