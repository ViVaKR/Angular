import { DocumentPostType } from "@app/core/enums/document-post-type";

/**
 * 문서 필터 파라미터 (API BuddhistDocumentFilterDTO와 1:1 매칭)
 */
export interface IDocumentFilterParams {
    // ========== 필터 옵션 ==========

    /**
     * 문서 타입 필터 (null이면 전체)
     */
    documentType?: DocumentType;

    /**
     * 추천 여부 필터
     */
    isFeatured?: boolean;

    /**
     * 검증 여부 필터
     */
    isVerified?: boolean;

    /**
     * 공개 타입 필터
     */
    documentPostType?: DocumentPostType;

    /**
     * 저자 ID 필터 (Guid를 string으로 전달)
     */
    authorId?: string;

    /**
     * 전통 필터 (예: "선종", "정토종")
     */
    tradition?: string;

    /**
     * 대상 수준 필터 (예: "입문", "초급", "중급", "고급")
     */
    targetLevel?: string;

    /**
     * 경전 ID 필터
     */
    scriptureMasterId?: number;

    /**
     * 검색 키워드 (제목, 내용, 요약)
     */
    searchKeyword?: string;

    /**
     * 시작 날짜 (법문일시)
     * ISO 8601 형식 문자열로 전달
     */
    startDate?: string;

    /**
     * 종료 날짜 (법문일시)
     * ISO 8601 형식 문자열로 전달
     */
    endDate?: string;

    // ========== 페이지네이션 ==========

    /**
     * 페이지 번호 (1부터 시작, 기본값: 1)
     */
    pageNumber?: number;

    /**
     * 페이지 크기 (기본값: 15)
     */
    pageSize?: number;

    // ========== 정렬 ==========

    /**
     * 정렬 필드 (기본값: "createdAt")
     * 가능한 값: "title", "viewCount", "likeCount", "bookmarkCount",
     *           "dharmaDate", "publishedAt", "createdAt"
     */
    sortBy?: string;

    /**
     * 정렬 방향 (기본값: "desc")
     */
    sortDirection?: 'asc' | 'desc';
}
