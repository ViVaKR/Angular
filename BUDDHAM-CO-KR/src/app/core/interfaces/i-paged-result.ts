export interface IPagedResult<T> {

  /**
   * 데이터 배열
   */
  data: T[];

  /**
   * 전체 데이터 개수
   */
  totalCount: number;

  /**
   * 현재 페이지 번호
   */
  pageNumber: number;

  /**
   * 페이지 크기
   */
  pageSize: number;

  /**
   * 전체 페이지 수
   */
  totalPages: number;

  /**
   * 이전 페이지 존재 여부
   */
  hasPreviousPage: boolean;

  /**
   * 다음 페이지 존재 여부
   */
  hasNextPage: boolean;
}
