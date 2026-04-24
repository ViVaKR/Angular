import { PinOrder } from "../enums/pin-order";

export interface IPagedQuery {

    /**
     * 현재 페이지 번호
     */
    pageNumber: number;

    /**
     * 페이지 크기
     */
    pageSize: number;

    /**
     * 검색 키워드
     */
    searchKeyword?: string;

    /**
     * 게시물 고정 순서
     * 0 = 일반글
     * 10 = 일반 고정
     * 50 = 중요 공지
     * 100 = 최상단 공지
     */
    pinOrder?: PinOrder;
}
