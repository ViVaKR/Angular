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
   * 다음 페이지 존재 여부
   * 더 오래된 메시지 있음
   */
  hasNextPage: boolean;


  /**
   * 이전 페이지 존재 여부
   * 더 최신 메시지 있음 (거의 사용안함)
   */
  hasPreviousPage: boolean;

  /**
   * 버튼 표시 여부
   * 채팅 전용
   */
  hasOlderMessagaes?: boolean | null;
}


/*
메시지 총 250개 (1번~250번, 250번이 최신)

page=1 → OrderByDescending → [250, 249, 248 ... 151] → Reverse → [151...250] 반환
page=2 → OrderByDescending → [150, 149, 148 ... 51]  → Reverse → [51 ...150] 반환
page=3 → OrderByDescending → [50,  49,  48  ... 1]   → Reverse → [1  ... 50] 반환

*/
