import { TangwhaTier } from "@app/core/enums/tangwha-tier";

export type TangwhaCategory = '불보살' | '나한' | '신중' | '산신' | '기타';
// export type TangwhaTier = 1 | 2 | 3;

export interface ITangwhaSchema {

    id: number;
    title: string; // 한국어 명칭
    chineseTitle?: string | null; // 한문 명칭
    category: TangwhaCategory; // 분류
    tier: TangwhaTier; // 1=국보 2=보물 3=일반
    era?: string | null; // 제작연도 (예: "1725년")
    temple?: string | null; // 소장 사찰
    description?: string | null; // 상세 설명
    thumbnailUrl?: string | null; // 썸네일 URL
    imageUrl?: string | null; // 원본 이미지 URL

    /** 서버에서 조립도니 통합  검색 키 (읽기 전용) */
    readonly searchKey: string;
}

export interface ITangwhaUpsert {
    id?: number;
    title: string; // 한국어 명칭
    chineseTitle?: string | null; // 한문 명칭
    category: TangwhaCategory; // 분류
    tier: TangwhaTier; // 1=국보 2=보물 3=일반
    era?: string | null; // 제작연도 (예: "1725년")
    temple?: string | null; // 소장 사찰
    description?: string | null; // 상세 설명
    thumbnailUrl?: string | null; // 썸네일 URL
    imageUrl?: string | null; // 원본 이미지 URL
}

// ── 검색/필터 요청 파라미터 ──────────────────────────────
export interface ITangwhaQuery {
    cursor?: string | null;
    category?: TangwhaCategory | 'all';
    search?: string;
    size?: number;
    tier?: TangwhaTier | null;
}
