import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment.development';
import { firstValueFrom, Observable } from 'rxjs';
import { IResponse } from '@app/core/interfaces/i-response';
import { RsCode } from '@app/core/enums/rs-code';
import { IScriptureMaster } from '../interfaces/i-scripture-master';
import { IScriptureParagraph, IScriptureStructureLabel } from '../interfaces/i-scripture-paragraph';
import { IScriptureParagraphListDTO } from '../interfaces/i-scripture-paragraph-list-dto';
import { IParagraphFilterParams } from '../interfaces/i-paragraph-filter-params';
import { IPagedResult } from '../interfaces/i-paged-result';
import { IContentFilterParams } from '../interfaces/i-content-filter-params';
import { IScriptureContent } from '../interfaces/i-scripture-content';

@Injectable({ providedIn: 'root' })
export class ScriptureService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // #region ScriptureMaster

  // ========== 📚 ScriptureMaster ==========

  // * GET All Master
  public masterList = httpResource<IScriptureMaster[]>(() => `${this.baseUrl}/Scripture/GetMasterList`);

  /**
   * Master 단건 조회
   */
  public masterRead(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/Scripture/MasterRead/${id}`);
  }

  /**
   * Master 생성/수정
   * ✅ Interceptor가 에러 알림 처리
   * ✅ try-catch 제거
   */
  public async masterCreateOrUpdate(payload: IScriptureMaster, id?: number): Promise<IResponse> {
    const res = id
      ? await firstValueFrom(this.http.put<IResponse>(`${this.baseUrl}/Scripture/MasterUpdate/${id}`, { ...payload, id }))
      : await firstValueFrom(this.http.post<IResponse>(`${this.baseUrl}/Scripture/MasterCreate`, payload));
    if (res.rsCode === RsCode.Ok) { this.masterList.reload(); }
    return res;
  }

  /**
   * Master 삭제
   */
  public async masterDelete(id: number): Promise<IResponse> {

    const res = await firstValueFrom(
      this.http.delete<IResponse>(`${this.baseUrl}/Scripture/MasterDelete/${id}`)
    );

    if (res.rsCode === RsCode.Ok) this.masterList.reload();

    return res;
  }
  // #endregion

  // #region ScriptureParagraph

  // ========== 📖 ScriptureParagraph ==========

  // * Get All Paragraph
  public paragraphList = httpResource<IScriptureParagraphListDTO[]>(() => `${this.baseUrl}/Scripture/ParagraphList`);

  // * Paragraph 서버 필터링
  private paragraphFilterSignal = signal<IParagraphFilterParams>({
    scriptureMasterId: undefined,
    pageNumber: 1,
    pageSize: 50
  });

  public paragraphListPaged = httpResource<IPagedResult<IScriptureParagraphListDTO>>(() => {
    const filter = this.paragraphFilterSignal();
    const url = `${this.baseUrl}/Scripture/GetParagraphList`;
    const queryString = this.buildParagraphQueryString(filter);
    return queryString ? `${url}?${queryString}` : url;
  });

  updateParagraphFilter(filter: Partial<IParagraphFilterParams>) {
    this.paragraphFilterSignal.update(current => ({
      ...current,
      ...filter
    }));
  }

  private buildParagraphQueryString(params: IParagraphFilterParams): string {
    const query = new URLSearchParams();

    if (params.scriptureMasterId !== undefined) {
      query.append('scriptureMasterId', params.scriptureMasterId.toString());
    }
    if (params.mainCategoryType !== undefined) {
      query.append('mainCategoryType', params.mainCategoryType.toString());
    }
    if (params.searchKeyword) {
      query.append('searchKeyword', params.searchKeyword);
    }
    if (params.pageNumber !== undefined) {
      query.append('pageNumber', params.pageNumber.toString());
    }
    if (params.pageSize !== undefined) {
      query.append('pageSize', params.pageSize.toString());
    }

    return query.toString();
  }
  /**
   * Paragraph 단건 조회
   */
  public paragraphReadWithMaster(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/Scripture/Paragraph/${id}`);
  }

  // ✅ 전체 레이블 맵 — 앱 시작시 한 번만 로드
  // 반환 타입: Record<number, IScriptureStructureLabel>
  // 즉 { 1: {...}, 2: {...} } 형태
  public structureLabelMap = httpResource<Record<number, IScriptureStructureLabel>>(() => `${this.baseUrl}/Scripture/GetStructureLabelMap`);

  // ✅ 단일 레이블 Upsert
  async upsertStructureLabel(
    id: number,
    payload: IScriptureStructureLabel
  ): Promise<IResponse> {
    const response = await firstValueFrom(
      this.http.put<IResponse>(`${this.baseUrl}/Scripture/UpsertStructureLabel/${id}`, payload)
    );
    if (response.rsCode === RsCode.Ok)
      this.structureLabelMap.reload();
    return response;
  }

  /**
  * Paragraph + Master 조회
  */
  public paragraphRead(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/Scripture/ParagraphRead/${id}`);
  }

  /**
   * Paragraph 생성/수정
   */
  public async paragraphCreateOrUpdate(payload: IScriptureParagraph, id?: number): Promise<IResponse> {

    const res = id
      ? await firstValueFrom(this.http.put<IResponse>(`${this.baseUrl}/Scripture/ParagraphUpdate/${id}`, { ...payload, id }))
      : await firstValueFrom(this.http.post<IResponse>(`${this.baseUrl}/Scripture/ParagraphCreate`, payload));

    if (res.rsCode === RsCode.Ok) { this.paragraphList.reload(); }

    return res;

  }

  /**
   * Paragraph 삭제
   */
  public async paragraphDelete(id: number): Promise<IResponse> {
    const res = await firstValueFrom(
      this.http.delete<IResponse>(`${this.baseUrl}/Scripture/ParagraphDelete/${id}`)
    );
    if (res.rsCode === RsCode.Ok) this.paragraphList.reload();

    return res;
  }
  // #endregion

  // #region Transcription

  // #endregion

  // #region ScriptureContent

  public scriptureContentList = httpResource<IPagedResult<IScriptureContent>>(() => {
    const filter = this.contentFilterSignal();
    const url = `${this.baseUrl}/Scripture/GetContentList`;
    const queryString = this.buildContentQueryString(filter);
    return queryString ? `${url}?${queryString}` : url;
  });

  private contentFilterSignal = signal<IContentFilterParams>({
    scriptureMasterId: undefined,
    userId: undefined,
    contentCategory: undefined,
    pageNumber: 1,
    pageSize: 15
  });

  updateContentFilter(filter: Partial<IContentFilterParams>) {
    this.contentFilterSignal.update(current => ({
      ...current,
      ...filter
    }));
  }


  private buildContentQueryString(params: IContentFilterParams): string {
    const query = new URLSearchParams();

    if (params.scriptureMasterId !== undefined) {
      query.append('scriptureMasterId', params.scriptureMasterId.toString());
    }
    if (params.userId) {
      query.append('userId', params.userId);
    }
    if (params.contentCategory !== undefined) {
      query.append('contentCategory', params.contentCategory.toString());
    }
    if (params.postType !== undefined) {
      query.append('postType', params.postType.toString());
    }
    if (params.searchKeyword) {
      query.append('searchKeyword', params.searchKeyword);
    }
    if (params.pageNumber !== undefined) {
      query.append('pageNumber', params.pageNumber.toString());
    }
    if (params.pageSize !== undefined) {
      query.append('pageSize', params.pageSize.toString());
    }

    return query.toString();
  }

  // #endregion
}
