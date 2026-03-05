import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment.development';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { IHelp } from '@app/core/interfaces/i-help';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagedQuery } from '@app/core/interfaces/i-paged-query';
import { IPagedResult } from '@app/core/interfaces/i-paged-result';
import { ISearchConfig } from '../interfaces/i-search-config';
import { toObservable } from '@angular/core/rxjs-interop';
import { PinOrder } from '../enums/pin-order';

@Injectable({ providedIn: 'root' })
export class HelpService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  // private destroy$ = new Subject<void>();

  // 검색 전략 - 외부에서 주입 가능
  readonly searchConfig: ISearchConfig = {
    strategy: 'server', //
    localThreshold: 1, // 로컬: 1글자 부터
    serverThreshold: 2, // 서버: 2글자 부터
  }

  private readonly initialQuery: IPagedQuery = {
    pageNumber: 1,
    pageSize: 100,
    pinOrder: PinOrder.NotFixed,
    searchKeyword: ''
  };

  readonly state = signal<{
    data: IHelp[];
    totalCount: number;
    currentPage: number;
    hasNextPage: boolean;
  }>({ data: [], totalCount: 0, currentPage: 0, hasNextPage: false });

  // signal
  readonly isLoading = signal(false);
  readonly error = signal<any>(null);
  readonly query = signal<IPagedQuery>({ ...this.initialQuery });

  // 파생 computed
  readonly accumulatedData = computed(() => this.state().data);
  readonly totalCount = computed(() => this.state().totalCount);
  readonly currentPage = computed(() => this.state().currentPage);
  readonly hasNext = computed(() => this.state().hasNextPage);
  readonly helpList = computed(() => this.state().data)

  // 서버 검색 활성 여부 - 서비스가 단일 소유
  readonly isServerSearchActive = computed(() =>
    (this.query().searchKeyword ?? '').trim().length >= this.searchConfig.serverThreshold
    && this.searchConfig.strategy === 'server'
  );

  // 검색 모드 여부 (더보기 버튼 숨김/표시 제어용)
  readonly isSearchMode = computed(() => (this.query().searchKeyword ?? '').trim().length > 0);

  // debounce 검색 스트림
  // private readonly searchSubject = new Subject<string>();
  private readonly searchKeyword = signal<string>('');

  constructor() {
    // 1. 시그널을 Observable 로 변환! (Angular 가 생명 주기 자동관리)
    toObservable(this.searchKeyword).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      // 2. 더이상 takeUntil(this.destroy$) 불필요
      // toObservable 이 서비스 파되시 알아서 정

    ).subscribe(keyword => {
      this.resetAndReload(keyword);
    });
  }

  public loadHelpList(query: IPagedQuery, append: boolean = false): void {
    this.isLoading.set(true);
    this.error.set(null);

    let params = new HttpParams()
      .append('pageNumber', query.pageNumber)
      .append('pageSize', query.pageSize)
      .append('pinOrder', query.pinOrder ?? PinOrder.NotFixed)

    if (query.searchKeyword) {
      params = params.append('searchKeyword', query.searchKeyword);
    }

    this.http.get<IPagedResult<IHelp>>(`${this.baseUrl}/Buddham/GetHelpList`, { params })
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

  loadNextPage(): void {

    if (this.state().hasNextPage) {
      const nextQuery = { ...this.query(), pageNumber: this.query().pageNumber + 1 };
      this.query.set(nextQuery);
      this.loadHelpList(nextQuery, true);
    }
  }

  resetAndReload(keyword?: string): void {
    const newQuery = { ...this.initialQuery, searchKeyword: keyword ?? '' };
    this.query.set(newQuery);
    this.loadHelpList(newQuery, false);
  }

  changePage(page: number, pageSize: number): void {
    const q = { ...this.query(), page, pageSize };
    this.query.set(q);
    this.loadHelpList(q);
  }

  search(keyword: string): void {
    const q = { ...this.query(), pageNumber: 1, searchKeyword: keyword };
    this.query.set(q);
    this.loadHelpList(q);
  }

  // 외부에서 호출 (AccordionTable -> 부모 -> 서비스)
  searchByKeyword(keyword: string): void {
    this.searchKeyword.set(keyword.trim());
  }

  reload(): void {
    this.resetAndReload(this.query().searchKeyword);
  }
}
