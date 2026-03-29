// ── 공통 베이스 ──────────────────────────────────────
export interface IPassageSchema {
    canonId: number;          // 소속 경전
    title?: string;

    // 계층 구조 (1장 1절 → 1장 2절 스레딩)
    volume?: number;          // 권
    volumeTitle?: string;
    chapter?: number;         // 품/장
    chapterTitle?: string;
    section?: number;         // 단락
    sectionTitle?: string;
    verse?: number;           // 게송/절
    verseTitle?: string;

    sortOrder: number;        // 전체 정렬 순서
    refCode?: string;         // 참조 코드 (DN1, MN72...)

    // 다국어 본문
    content: string;          // 한글 (필수)
    chineseContent?: string;  // 한문
    originalContent?: string; // 범어/팔리
    commentary?: string;      // 주석

    tags?: string[];
}

// ── 목록/단건 응답 ────────────────────────────────────
export interface IPassage extends IPassageSchema {
    id: number;
    createdAt: string | Date;
    modifiedAt?: string | Date;
}

// ── Create ────────────────────────────────────────────
// 1장 1절: 모든 메타 + content 입력
// 1장 2절: chapter/verse + content만 입력 (나머지 상속)
export interface IPassageEntry extends IPassageSchema { }

// ── Update ────────────────────────────────────────────
export interface IPassagePatch extends Partial<IPassageSchema> {
    id: number;
}
