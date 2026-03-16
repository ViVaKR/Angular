import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment.development';
import { ISearchConfig } from '../interfaces/i-search-config';
import { IPagedQuery } from '../interfaces/i-paged-query';
import { PinOrder } from '../enums/pin-order';
import { IReplyCreate, IScriptureTranscription, IScriptureTranscriptionCreateOrUpdate } from '../interfaces/i-scripture-transciption';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, finalize, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagedResult } from '../interfaces/i-paged-result';
import { IResponse } from '../interfaces/i-response';

@Injectable({ providedIn: 'root' })
export class ScriptureTranscriptionService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // 검색전략 - 외부에서 주입 가능
  readonly searchConfig: ISearchConfig = {
    strategy: 'server',
    localThreshold: 1, // 로컬
    serverThreshold: 2 // 서버
  }

  // ── 초기 쿼리 ──────────────────────────────
  private readonly initialQuery: IPagedQuery = {
    pageNumber: 1,
    pageSize: 100,
    pinOrder: PinOrder.NotFixed,
    searchKeyword: ''
  }

  // ── State Signals ───────────────────────────
  readonly isLoading = signal(false);
  readonly error = signal<any>(null);
  readonly query = signal<IPagedQuery>({ ...this.initialQuery });
  public activeRootId = signal<number | string | null>(null);
  readonly state = signal<{
    data: IScriptureTranscription[];
    totalCount: number;
    currentPage: number;
    hasNextPage: boolean;
  }>({ data: [], totalCount: 0, currentPage: 0, hasNextPage: false });
  private readonly searchKeyword = signal<string>('');

  // ── Computed ────────────────────────────────
  readonly dataList = computed(() => this.state().data);
  readonly totalCount = computed(() => this.state().totalCount);
  readonly hasNext = computed(() => this.state().hasNextPage);
  readonly isSearchMode = computed(() => (this.query().searchKeyword ?? '').trim().length > 0);

  readonly accumulatedData = computed(() => this.state().data);
  readonly currentPage = computed(() => this.state().currentPage);

  // 서버 검색 활성 여부
  readonly isServerSearchActive = computed(() =>
    (this.query().searchKeyword ?? '').trim().length >= this.searchConfig.serverThreshold
    && this.searchConfig.strategy === 'server');

  constructor() {

    toObservable(this.searchKeyword).pipe(
      debounceTime(1_000),
      distinctUntilChanged()
    ).subscribe(keyword => { this.resetAndReload(keyword) });

  }

  public loadDataList(query: IPagedQuery, append: boolean = false): void {
    this.isLoading.set(true);
    this.error.set(null);

    let params = new HttpParams()
      .append('pageNumber', query.pageNumber)
      .append('pageSize', query.pageSize)
      .append('pinOrder', query.pinOrder ?? PinOrder.NotFixed);

    if (query.searchKeyword) {
      params = params.append('searchKeyword', query.searchKeyword);
    }

    this.http.get<IPagedResult<IScriptureTranscription>>(`${this.baseUrl}/Scriptuer/TranspritionList`, { params })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: res => {
          if (append) {
            this.state.update(prev => ({
              data: [...prev.data, ...res.data],
              totalCount: res.totalCount,
              currentPage: res.pageNumber,
              hasNextPage: res.hasNextPage ?? false
            }))
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

  getScriptureTranscriptionById(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/Scripture/Transcription/Detail/${id}`);
  }

  /**
   * 1단계 댓글
   * parentId 없음
   * mentionedUserName 없음
   */
  createComment(rootItem: IScriptureTranscription, content: string): Observable<IResponse> {
    const dto: IReplyCreate = {
      parentId: null,
      rootId: rootItem.id as number,
      title: rootItem.title,
      content
    }
    return this.http.post<IResponse>(`${this.baseUrl}/Scripture/Transcription/ReplyCreate`, dto);
  }

  createReply(payload: IScriptureTranscription, replyContent: string): Observable<IResponse> {

    // 1. 최상위 루트 ID 를 찾음 (대댓글이라도 끝까지 추적)
    const finalRootId = Number(payload.rootId);

    // 2. 현재 활성화된 리소스 ID 를 강제로 맞춤 (새로고침 타켓팅)
    this.activeRootId.set(finalRootId);

    // 3. 서버 DTO 구성
    const dto: IReplyCreate = {
      parentId: Number(payload.id), // 내가 누구한테 답장하는가?
      rootId: finalRootId, // 이 대화의 뿌리는 어디인가?
      title: `Re: ${payload.title || 'Re: Reply'}`,
      content: replyContent, // 사용자가 입력한 새 내용
    }

    return this.http.post<IResponse>(`${this.baseUrl}/Scripture/Transcription/ReplyCreate`, dto);
  }

  /**
   * 더보기
   */
  loadNextPage(): void {

    if (!this.state().hasNextPage) return;
    const nextQuery = { ...this.query(), pageNumber: this.query().pageNumber + 1 };
    this.query.set(nextQuery);
    this.loadDataList(nextQuery, true);
  }

  /**
   * 좋아요 토글
   */
  toggleLike(id: number): Observable<{ likeCount: number; isLiked: boolean }> {
    return this.http.post<{ likeCount: number; isLiked: boolean }>(
      `${this.baseUrl}/Scripture/TranscriptionLikes/${id}/like`, {}
    );
  }

  /**
   * 검색 디바운스
   * @param keyword
   */
  searchByKeyword(keyword: string): void {
    this.searchKeyword.set(keyword.trim());
  }

  changePage(page: number, pageSize: number): void {
    const q = { ...this.query(), page, pageSize };
    this.query.set(q);
    this.loadDataList(q);
  }

  search(keyword: string): void {
    const q = { ...this.query(), pageNumber: 1, searchKeyword: keyword };
    this.query.set(q);
    this.loadDataList(q);
  }

  /**
   * 초기화 후 재조회
   */
  resetAndReload(keyword?: string): void {
    const newQuery = { ...this.initialQuery, searchKeyword: keyword ?? '' };
    this.query.set(newQuery);
    this.loadDataList(newQuery, false);
  }

  /**
   * 새로고침
   */
  reload(): void {
    this.resetAndReload(this.query().searchKeyword);
  }
}
