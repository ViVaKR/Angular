// services/document.service.ts

import { HttpClient, httpResource } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@env/environment.development";
import { IDocumentPagedResult } from "@app/core/interfaces/i-document-paged-result";
import { IDocumentFilterParams } from "../interfaces/i-document-filter-params";
import { IBuddhistDocument } from "../interfaces/i-buddhist-document";
import { Observable } from "rxjs";
import { IResponse } from "../interfaces/i-response";

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // 현재 필터를 Signal로 관리
  private filterSignal = signal<IDocumentFilterParams>({
    pageNumber: 1,
    pageSize: 15,
    sortBy: 'createdAt',
    sortDirection: 'desc'
  });

  /**
   * 문서 목록 리소스 (Signal 기반 필터링)
   */
  public documentList = httpResource<IDocumentPagedResult<IBuddhistDocument>>(() => {
    const filter = this.filterSignal();
    const url = `${this.baseUrl}/BuddhistDocument/GetDocumentList`;
    const queryString = this.buildQueryString(filter);
    return queryString ? `${url}?${queryString}` : url;
  });

  /**
   * 필터 업데이트 (자동으로 리로드됨)
   */
  updateFilter(filter: Partial<IDocumentFilterParams>) {
    this.filterSignal.update(current => ({
      ...current,
      ...filter
    }));
  }

  /**
   * 필터 설정 (완전히 교체)
   */
  setFilter(filter: IDocumentFilterParams) {
    this.filterSignal.set(filter);
  }

  /**
   * 현재 필터 가져오기
   */
  getCurrentFilter(): IDocumentFilterParams {
    return this.filterSignal();
  }

  /**
   * 필터 초기화
   */
  resetFilter() {
    this.filterSignal.set({
      pageNumber: 1,
      pageSize: 15,
      sortBy: 'createdAt',
      sortDirection: 'desc'
    });
  }

  /**
   * 특정 타입 문서 조회
   */
  // getDocumentsByType(
  //   type: DocumentType,
  //   pageNumber: number = 1,
  //   pageSize: number = 15
  // ): Observable<IDocumentPagedResult<IBuddhistDocument>> {
  //   const params: IDocumentFilterParams = {
  //     documentType: type,
  //     pageNumber,
  //     pageSize
  //   };

  //   return this.http.get<IDocumentPagedResult<IBuddhistDocument>>(
  //     `${this.baseUrl}/BuddhistDocument/GetDocumentsByType/${type}?${this.buildQueryString(params)}`
  //   );
  // }

  /**
   * 문서 상세 조회
   */
  documentRead(id: number): Observable<IResponse<IBuddhistDocument>> {
    return this.http.get<IResponse<IBuddhistDocument>>(
      `${this.baseUrl}/BuddhistDocument/DocumentRead/${id}`
    );
  }

  /**
   * Query String 빌드 (모든 필터 파라미터 지원)
   */
  private buildQueryString(params: IDocumentFilterParams): string {
    const query = new URLSearchParams();

    // 문서 타입
    if (params.documentType !== undefined) {
      query.append('documentType', params.documentType.toString());
    }

    // Boolean 필터들
    if (params.isFeatured !== undefined) {
      query.append('isFeatured', params.isFeatured.toString());
    }

    if (params.isVerified !== undefined) {
      query.append('isVerified', params.isVerified.toString());
    }

    // 공개 타입
    if (params.documentPostType !== undefined) {
      query.append('documentPostType', params.documentPostType.toString());
    }

    // 저자 ID (Guid → string)
    if (params.authorId) {
      query.append('authorId', params.authorId);
    }

    // 전통
    if (params.tradition) {
      query.append('tradition', params.tradition);
    }

    // 대상 수준
    if (params.targetLevel) {
      query.append('targetLevel', params.targetLevel);
    }

    // 경전 ID
    if (params.scriptureMasterId !== undefined) {
      query.append('scriptureMasterId', params.scriptureMasterId.toString());
    }

    // 검색 키워드
    if (params.searchKeyword) {
      query.append('searchKeyword', params.searchKeyword);
    }

    // 날짜 범위
    if (params.startDate) {
      query.append('startDate', params.startDate);
    }

    if (params.endDate) {
      query.append('endDate', params.endDate);
    }

    // 페이지네이션
    if (params.pageNumber !== undefined) {
      query.append('pageNumber', params.pageNumber.toString());
    }

    if (params.pageSize !== undefined) {
      query.append('pageSize', params.pageSize.toString());
    }

    // 정렬
    if (params.sortBy) {
      query.append('sortBy', params.sortBy);
    }

    if (params.sortDirection) {
      query.append('sortDirection', params.sortDirection);
    }

    return query.toString();
  }
}

/*
  // 전체 조회
  GET /BuddhistDocument/GetDocumentList

  // 법문만 조회
  GET /BuddhistDocument/GetDocumentList?documentType=0

  // 법문 + 추천 + 페이지네이션
  GET /BuddhistDocument/GetDocumentList?documentType=0&isFeatured=true&pageNumber=1&pageSize=15

  // 검색 + 정렬
  GET /BuddhistDocument/GetDocumentList?searchKeyword=부처님&sortBy=viewCount&sortDirection=desc

  // 간단한 방법
  GET /BuddhistDocument/GetDocumentsByType/0?pageNumber=1&pageSize=15

*/
