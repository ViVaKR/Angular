import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RsCode } from '@app/core/enums/rs-code';
import { ICursorPage } from '@app/core/interfaces/i-cursor-result';
import { IResponse } from '@app/core/interfaces/i-response';
import { ITangwhaQuery, ITangwhaSchema, ITangwhaUpsert } from '@app/core/interfaces/tangwha/i-tangwha';
import { environment } from '@env/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TangwhaService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // ── 클라이언트 상태 ─────────────────────────────────────
  readonly items = signal<ITangwhaSchema[]>([]);
  readonly isLoading = signal(false);
  readonly hasMore = signal(true);
  readonly total = signal(0);
  private cursor: string | null = null;

  /**
   * 다음 페이지 로드
   * IntersectionObserver 가 호출
   * @param query
   * @returns
   */
  async loadMore(query: ITangwhaQuery): Promise<void> {

    if (this.isLoading() || !this.hasMore()) return;
    this.isLoading.set(true);
    try {

      const result = await this.fetchPage({
        ...query,
        cursor: this.cursor,
        size: query.size ?? 12,
      });

      this.items.update(prev => [...prev, ...result.items]);
      this.cursor = result.nextCursor;
      this.hasMore.set(result.hasMore);
      this.total.set(result.total);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * 단건 조회
   */
  async getById(id: number): Promise<ITangwhaSchema> {
    return firstValueFrom(
      this.http.get<ITangwhaSchema>(`${this.baseUrl}/Tangwha/${id}`)
    );
  }

  /**
   * 생성 및 수정
   * Upsert
   */
  public async upSert(payload: ITangwhaUpsert, id?: number | string): Promise<IResponse> {
    const url = id
      ? `${this.baseUrl}/Tangwha/Update/${id}`
      : `${this.baseUrl}/Tangwha/Create`;
    const res = id
      ? await firstValueFrom(this.http.put<IResponse>(url, payload))
      : await firstValueFrom(this.http.post<IResponse>(url, payload));

    if (res.rsCode === RsCode.Ok) this.reload();
    return res;
  }

  /**
   * 삭제
   * Delete
   */
  public async delete(id: number | string): Promise<IResponse> {
    const res = await firstValueFrom(
      this.http.delete<IResponse>(`${this.baseUrl}/Tangwha/Delete/${id}`));
    if (res.rsCode === RsCode.Ok) this.reload();
    return res;
  }

  /**
   * 초기화
   * 필터 변경 시 호출
   */
  reset(): void {
    this.items.set([]);
    this.cursor = null;
    this.hasMore.set(true);
    this.total.set(0);
  }

  /**
   * 갱신
   */
  public reload(): void {
    this.loadMore({
      category: 'all',
      search: '',
      size: 12
    });
  }

  // ── 내부: HTTP 요청 ─────────────────────────────────────
  private async fetchPage(query: ITangwhaQuery): Promise<ICursorPage<ITangwhaSchema>> {
    let params = new HttpParams().set('size', String(query.size ?? 12));
    if (query.cursor) params = params.set('cursor', query.cursor);
    if (query.search) params = params.set('search', query.search);
    if (query.tier) params = params.set('tier', String(query.tier));
    if (query.category && query.category !== 'all')
      params = params.set('category', query.category);

    return firstValueFrom(
      // Tangwha/TangwhaList
      this.http.get<ICursorPage<ITangwhaSchema>>(`${this.baseUrl}/Tangwha/TangwhaList`, { params })
    );
  }
}
