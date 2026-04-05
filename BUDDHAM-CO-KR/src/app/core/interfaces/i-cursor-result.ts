export interface ICursorResult<T> {
    items: T[];
    nextCursor: Date | null;
    hasMore: boolean;
}
// ── Cursor 기반 페이징 응답 ───────────────────────────────
export interface ICursorPage<T> {
    items: T[];
    hasMore: boolean;
    nextCursor: string | null;
    total: number;
}
