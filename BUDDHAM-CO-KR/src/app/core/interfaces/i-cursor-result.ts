export interface ICursorResult<T> {
    items: T[];
    nextCursor: Date | null;
    hasMore: boolean;
}
