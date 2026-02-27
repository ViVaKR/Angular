import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment.development';
import { finalize } from 'rxjs';
import { IHelp } from '../interfaces/i-help';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagedQuery } from '../interfaces/i-paged-query';
import { IPagedResult } from '../interfaces/i-paged-result';

@Injectable({ providedIn: 'root' })
export class HelpService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // 초기 쿼리 상태 정의
  private readonly initialQuery: IPagedQuery = {
    pageNumber: 1,
    pageSize: 10,
    pinOrder: true,
    searchKeyword: '' // 키워드도 초기화에 포함
  };

  readonly isLoading = signal(false);
  readonly error = signal<any>(null);
  readonly response = signal<IPagedResult<IHelp> | null>(null);
  readonly query = signal<IPagedQuery>({ ...this.initialQuery });
  readonly accumulatedData = signal<IHelp[]>([]);
  readonly totalCount = signal(0);
  readonly currentPage = signal(1);

  readonly helpList = computed(() => this.response()?.data ?? []);
  readonly hasNext = computed(() => this.response()?.hasNextPage);

  /**
   * Help List
   * @param query
   * @param append
   */
  public loadHelpList(query: IPagedQuery, append: boolean = false): void {
    this.isLoading.set(true);
    this.error.set(null);

    let params = new HttpParams()
      .append('pageNumber', query.pageNumber)
      .append('pageSize', query.pageSize)
      .append('pinOrder', query.pinOrder)

    if (query.searchKeyword) {
      params = params.append('searchKeyword', query.searchKeyword);
    }

    this.http.get<IPagedResult<IHelp>>(`${this.baseUrl}/Buddham/GetHelpList`, { params })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: res => {
          // 🔥 1. 전체 결과 저장 (이게 있어야 hasNext 체크가 됨!)
          this.response.set(res);
          this.totalCount.set(res.totalCount);
          this.currentPage.set(res.pageNumber);

          // 🔥 2. 데이터 누적 로직
          if (append) {
            this.accumulatedData.update(prev => [...prev, ...res.data]);
          } else {
            this.accumulatedData.set(res.data);
          }
        },

        error: err => this.error.set(err)
      });
  }

  // [전진] 다음 페이지 로드
  loadNextPage(): void {
    if (this.response()?.hasNextPage) {
      const nextQuery = {
        ...this.query(),
        pageNumber: this.query().pageNumber + 1
      };
      this.query.set(nextQuery);
      this.loadHelpList(nextQuery, true); // append: true
    } else {
      console.log('더 이상 가져올 데이터가 없습니다.');
    }
  }
  // [회귀] 완전히 처음부터 다시 로드 (검색어나 페이지 초기화)
  resetAndReload(keyword?: string): void {
    const newQuery = {
      ...this.initialQuery,
      searchKeyword: keyword ?? ''
    };
    this.query.set(newQuery);
    this.loadHelpList(newQuery, false);
  }

  // 페이지 변경
  changePage(page: number, pageSize: number): void {
    const q = { ...this.query(), page, pageSize };
    this.query.set(q);
    this.loadHelpList(q);
  }

  // 검색
  search(keyword: string): void {
    const q = { ...this.query(), page: 1, search: keyword };
    this.query.set(q);
    this.loadHelpList(q);
  }

  reload(): void {
    this.resetAndReload(this.query().searchKeyword);
  }
}
