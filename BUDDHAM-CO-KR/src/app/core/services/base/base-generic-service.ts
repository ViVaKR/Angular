import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { PinOrder } from '@app/core/enums/pin-order';
import { RsCode } from '@app/core/enums/rs-code';
import { IPagedQuery } from '@app/core/interfaces/i-paged-query';
import { IPagedResult } from '@app/core/interfaces/i-paged-result';
import { IResponse } from '@app/core/interfaces/i-response';
import { ISearchConfig } from '@app/core/interfaces/i-search-config';
import { environment } from '@env/environment.development';
import { debounceTime, distinctUntilChanged, finalize, firstValueFrom, Observable } from 'rxjs';

// TView: 조회용, TEntry: 생성용, TPatch: 수정용 (필요시 분리 가능)
@Injectable()
export abstract class BaseGenericService<TView extends { id: number },
  TEntry = any, TPatch = any
> {

  protected http = inject(HttpClient);
  protected baseUrl = environment.apiUrl;

  /* 자식에서 반드시 구현 */
  protected abstract readonly controllerName: string;
  protected abstract readonly resourceName: string;

  // ── 검색 전략 (자식에서 override 가능) ──────────
  readonly searchConfig: ISearchConfig = {
    strategy: 'server',
    localThreshold: 1, // 로컬 : 1
    serverThreshold: 2 // 서버 : 2
  }

  // ── 초기 쿼리 ──────────────────────────────
  private readonly initialQuery: IPagedQuery = {
    pageNumber: 1,
    pageSize: 10,
    pinOrder: PinOrder.NotFixed,
    searchKeyword: ''
  }

  // ── State Signals (T 타입 적용) ───────────────────────────
  readonly isLoading = signal(false);
  readonly error = signal<any>(null);
  readonly query = signal<IPagedQuery>({ ...this.initialQuery });
  public activeRootId = signal<number | string | null>(null);
  private readonly searchKeyword = signal<string>('');
  readonly state = signal<IPagedResult<TView>>({
    data: [] as TView[],       // 1. 빈 배열의 타입을 명시 (never[] 방지)
    totalCount: 0,
    pageNumber: 0,
    pageSize: 10,
    totalPages: 0,             // 2. 누락되었던 필수 속성들 추가
    hasNextPage: false,
    hasPreviousPage: false,
    hasOlderMessagaes: null    // 3. 선택 사항(Optional)도 초기값으로 명시 가능
  });

  // ── Computed ────────────────────────────────
  readonly dataList = computed(() => this.state().data);
  readonly totalCount = computed(() => this.state().totalCount);
  readonly hasNext = computed(() => this.state().hasNextPage);
  readonly isSearchMode = computed(() => (this.query().searchKeyword ?? '').trim().length > 0);
  readonly isServerSearchActive = computed(() =>
    (this.query().searchKeyword ?? '').trim().length >= this.searchConfig.serverThreshold
    && this.searchConfig.strategy === 'server'
  );
  readonly accumulatedData = computed(() => this.state().data);
  readonly currentPage = computed(() => this.state().pageNumber);



  constructor() {

    // 검색어 자동 감지 및 리로드
    toObservable(computed(() => this.query().searchKeyword)).pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      // 검색어 바뀌면 1페이지 부터 새로조회
      this._loadList(false);
    });
  }

  // ── CRUD 핵심 로직 ────────────────────────────
  // ── URL 헬퍼 ─────────────────────────────────
  protected get apiBase(): string {
    return `${this.baseUrl}/${this.controllerName}/${this.resourceName}`;
  }

  /**
   * [목록 조회 (내부용)]
   * {Controller}/{Resource}List
   */
  private _loadList(append: boolean = false): void {

    this.isLoading.set(true);
    const q = this.query();

    let params = new HttpParams()
      .append('pageNumber', q.pageNumber)
      .append('pageSize', q.pageSize)
      .append('pinOrder', q.pinOrder ?? PinOrder.NotFixed);

    if (q.searchKeyword) {
      params = params.append('searchKeyword', q.searchKeyword.trim());
    }

    this.http.get<IPagedResult<TView>>(`${this.apiBase}List`, { params })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: res => {
          this.state.update(prev => ({
            ...res,
            data: append ? [...prev.data, ...res.data] : res.data
          }));
        },
        error: err => this.error.set(err)
      });
  }

  /** [목록 조회 (외부 호출용)] */
  public getList(append = false): void {
    this._loadList(append);
  }

  /**
   * [단건 조회]
   * {Controller}/{Resource}Read/{id}
   */
  getById(id: number | string): Observable<IResponse<TView>> {
    return this.http.get<IResponse<TView>>(`${this.baseUrl}/${this.controllerName}/${this.resourceName}Read/${id}`);
  }

  /**
   * [생성 또는 수정 (Upsert)]
   * Upsert
   */
  public async createOrUpdate(
    payload: TEntry | TPatch,
    id?: number | string
  ): Promise<IResponse> {
    const url = id
      ? `${this.apiBase}Update/${id}`
      : `${this.apiBase}Create`;

    const res = id
      ? await firstValueFrom(this.http.put<IResponse>(url, payload))
      : await firstValueFrom(this.http.post<IResponse>(url, payload))

    if (res.rsCode === RsCode.Ok) this.reload();
    return res;
  }

  /**
   * [삭제]
   *  {Controller}/{Resource}Delete/{id}
   */
  public async delete(id: number | string): Promise<IResponse> {
    const res = await firstValueFrom(
      this.http.delete<IResponse>(`${this.apiBase}Delete/${id}`));
    if (res.rsCode === RsCode.Ok) this.reload();
    return res;
  }

  /** [좋아요 토글]
   * {Controller}/{Resource}Likes/{id}/like
   */
  public toggleLike(id: number | string): Observable<{ likeCount: number; isLiked: boolean }> {
    return this.http.post<{ likeCount: number; isLiked: boolean }>(
      `${this.apiBase}Likes/${id}/like`, {}
    );
  }

  // ── 유틸리티 ──────────────────────────────────

  /** 검색어 설정 (디바운스 자동 적용) */
  public search(keyword: string): void {
    // pageNumber 리셋 + 검색어 설정 → constructor의 toObservable이 자동 감지
    this.query.update(q => ({
      ...q,
      pageNumber: 1,
      searchKeyword: keyword.trim()
    }));
  }

  /** 다음 페이지 더보기 */
  public loadNextPage(): void {
    if (!this.hasNext()) return;
    this.query.update(q => ({ ...q, pageNumber: q.pageNumber + 1 }));
    this._loadList(true);
  }

  /** 새로고침 (검색어 유지) */
  public reload(): void {
    this.query.update(x => ({ ...x, pageNumber: 1 }));
    this._loadList(false);
  }

  /** 완전 초기화 후 재조회 */
  public reset(): void {
    this.query.set({ ...this.initialQuery });
    this._loadList(false);
  }

}
