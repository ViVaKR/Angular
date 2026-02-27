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

  // 편의 computed
  readonly helpList = computed(() => this.response()?.data ?? []);
  // readonly totalCount = computed(() => this.response()?.totalCount ?? 0);
  readonly hasNext = computed(() => this.response()?.hasNextPage);

  // 누적된 데이터를 담을 signal
  readonly query = signal<IPagedQuery>({ ...this.initialQuery });
  readonly accumulatedData = signal<IHelp[]>([]);
  readonly totalCount = signal(0);

  loadHelpList(query: IPagedQuery, append: boolean = false): void {
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

          // 🔥 2. 데이터 누적 로직
          if (append) {
            this.accumulatedData.update(prev => [...prev, ...res.data]);
          } else {
            this.accumulatedData.set(res.data);
          }

          // this.response.set(res)
        },
        error: err => this.error.set(err)
      });
  }

  // 다음 페이지 로드 함수 추가
  // loadNextPage(): void {

  //   const currentQuery = this.query();
  //   const currentLoaded = this.accumulatedData().length;

  //   // 전체 개수보다 적게 불러왔을 때만 실행
  //   if (currentLoaded < this.totalCount()) {
  //     const nextQuery = { ...currentQuery, pageNumber: currentQuery.pageNumber + 1 };
  //     this.query.set(nextQuery);
  //     this.loadHelpList(nextQuery, true); // true 를 보내서 append 모드로 작동
  //   }
  // }
  // [전진] 다음 페이지 로드
  loadNextPage(): void {
    if (this.response()?.hasNextPage) { // DTO의 오타(hasNexPage) 반영
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
    this.loadHelpList(newQuery, false); // 새로고침은 무조건 appedn: false
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
