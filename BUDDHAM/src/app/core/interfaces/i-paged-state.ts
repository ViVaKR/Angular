export interface IPagedState<T> {

    data: T[];
    totalCount: number;
    currentPage: number;
    hasNextPage: boolean;
}
