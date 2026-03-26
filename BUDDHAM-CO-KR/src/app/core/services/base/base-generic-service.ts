import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { PinOrder } from '@app/core/enums/pin-order';
import { RsCode } from '@app/core/enums/rs-code';
import { IPagedQuery } from '@app/core/interfaces/i-paged-query';
import { IPagedResult } from '@app/core/interfaces/i-paged-result';
import { IQnaCreateOrUpdate } from '@app/core/interfaces/i-qna';
import { IResponse } from '@app/core/interfaces/i-response';
import { ISearchConfig } from '@app/core/interfaces/i-search-config';
import { environment } from '@env/environment.development';
import { debounceTime, distinctUntilChanged, finalize, firstValueFrom, Observable } from 'rxjs';

@Injectable()
export abstract class BaseGenericService<T extends { id: number | string, title: string }> {

  protected http = inject(HttpClient);
  protected baseUrl = environment.apiUrl;

  // 각 서비스마다 달라질 API 경로 (예: 'Dharma/Canons')
  protected abstract readonly resourcePath: string;

  // ── State Signals (T 타입 적용) ───────────────────────────
  readonly isLoading = signal(false);
  readonly error = signal<any>(null);
  readonly query = signal<IPagedQuery>({
    pageNumber: 1,
    pageSize: 100,
    pinOrder: PinOrder.NotFixed,
    searchKeyword: ''
  });
  public activeRootId = signal<number | string | null>(null);

  // ── 검색 디바운스 ────────────────────────────
  protected readonly searchKeyword = signal<string>('');

  readonly state = signal<{
    data: T[];
    totalCount: number;
    currentPage: number;
    hasNextPage: boolean;
  }>({ data: [], totalCount: 0, currentPage: 0, hasNextPage: false });

  /**
    * 검색전략
    * 외부에서 주입가능
    */
  readonly searchConfig: ISearchConfig = {
    strategy: 'server',
    localThreshold: 1, // 로컬 : 1
    serverThreshold: 2 // 서버 : 2
  }

  // ── 초기 쿼리 ──────────────────────────────
  private readonly initialQuery: IPagedQuery = {
    pageNumber: 1,
    pageSize: 100,
    pinOrder: PinOrder.NotFixed,
    searchKeyword: ''
  }
  // ── Computed ────────────────────────────────
  readonly dataList = computed(() => this.state().data);
  readonly totalCount = computed(() => this.state().totalCount);
  readonly hasNext = computed(() => this.state().hasNextPage);
  readonly isSearchMode = computed(() => (this.query().searchKeyword ?? '').trim().length > 0);
  readonly accumulatedData = computed(() => this.state().data);
  readonly currentPage = computed(() => this.state().currentPage);
  readonly isServerSearchActive = computed(() =>
    (this.query().searchKeyword ?? '').trim().length >= this.searchConfig.serverThreshold
    && this.searchConfig.strategy === 'server'
  );

  constructor() {
    // 1. 시그널을 Observable 로 변환 (Angular 가 생명 주기 자동관리)
    toObservable(this.searchKeyword).pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(keyword => {
      this.resetAndReload(keyword);
    });

  }

  /**
   * 목록 불러오기
   * append : 더보기 여부
   * @param query
   * @param append
   */
  public getList(query: IPagedQuery, append: boolean = false): void {

    this.isLoading.set(true);
    this.error.set(null);

    let params = new HttpParams()
      .append('pageNumber', query.pageNumber)
      .append('pageSize', query.pageSize)
      .append('pinOrder', query.pinOrder ?? PinOrder.NotFixed);

    if (query.searchKeyword) {
      params = params.append('searchKeyword', query.searchKeyword);
    }

    this.http.get<IPagedResult<T>>(`${this.baseUrl}/${this.resourcePath}`, { params })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: res => {
          if (append) {
            this.state.update(prev => ({
              data: [...prev.data, ...res.data],
              totalCount: res.totalCount,
              currentPage: res.pageNumber,
              hasNextPage: res.hasNextPage ?? false
            }));
          } else {
            this.state.set({
              data: res.data,
              totalCount: res.totalCount,
              currentPage: res.pageNumber,
              hasNextPage: res.hasNextPage ?? false
            });
          }
        },
        error: err => this.error.set(err)
      });
  }


  /**
   * 단건 조회
   * @param id
   * @returns
   */
  getQnaById(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/Buddham/QnaRead/${id}`);
  }

  /**
   * 삭제
   */
  public async deleteQna(id: number): Promise<IResponse> {
    const res = await firstValueFrom(
      this.http.delete<IResponse>(`${this.baseUrl}/Buddham/QnaDelete/${id}`));
    if (res.rsCode === RsCode.Ok) this.reload();
    return res;
  }

  /**
   * 질문과 답변 생성 및 수정하기
   */
  public async qnaCreateOrUpdate(payload: IQnaCreateOrUpdate, id?: number): Promise<IResponse> {
    const res = id
      ? await firstValueFrom(this.http.put<IResponse>(
        `${this.baseUrl}/Buddham/QnaUpdate/${id}`, { ...payload, id }))
      : await firstValueFrom(this.http.post<IResponse>(`${this.baseUrl}${this.resourcePath}`, payload));

    if (res.rsCode === RsCode.Ok) this.reload();
    return res;
  }
  /**
   * 더보기
   */
  loadNextPage(): void {

    if (!this.state().hasNextPage) return;
    const nextQuery = { ...this.query(), pageNumber: this.query().pageNumber + 1 };
    this.query.set(nextQuery);
    this.getList(nextQuery, true);
  }

  /**
   * 좋아요 토글
   */
  toggleLike(id: number): Observable<{ likeCount: number; isLiked: boolean }> {
    return this.http.post<{ likeCount: number; isLiked: boolean }>(
      `${this.baseUrl}/Buddham/QnaLikes/${id}/like`, {}
    );
  }

  /** 검색 (디바운스) */
  searchByKeyword(keyword: string): void {
    this.searchKeyword.set(keyword.trim());
  }

  /** 초기화 후 재조회 */
  resetAndReload(keyword?: string): void {
    const newQuery = { ...this.initialQuery, searchKeyword: keyword ?? '' };
    this.query.set(newQuery);
    this.getList(newQuery, false);
  }

  changePage(page: number, pageSize: number): void {
    const q = { ...this.query(), page, pageSize };
    this.query.set(q);
    this.getList(q);
  }

  search(keyword: string): void {
    const q = { ...this.query(), pageNumber: 1, searchKeyword: keyword };
    this.query.set(q);
    this.getList(q);
  }

  /**
   * 새로고침
   */
  reload(): void {
    this.resetAndReload(this.query().searchKeyword);
  }
}
