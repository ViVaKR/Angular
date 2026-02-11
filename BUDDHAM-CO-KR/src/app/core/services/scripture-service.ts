import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { firstValueFrom, Observable } from 'rxjs';
import { IResponse } from '@app/core/interfaces/i-response';
import { RsCode } from '@app/core/enums/rs-code';
import { IScriptureMaster } from '../interfaces/i-scripture-master';
import { IScriptureParagraph } from '../interfaces/i-scripture-paragraph';
import { IScriptureMasterCreate } from '../interfaces/i-scripture-master-create';

@Injectable({ providedIn: 'root' })
export class ScriptureService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // #region ScriptureMaster

  // * GET All Master
  public masterList = httpResource<IScriptureMaster[]>(() => `${this.baseUrl}/Scripture/GetMasterList`);

  // * READ Master
  public masterRead(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/Scripture/MasterRead/${id}`);
  }

  // * POST, PUT Master
  public async masterCreateOrUpdate(payload: IScriptureMasterCreate, id?: number): Promise<IResponse> {
    try {
      let response: IResponse;

      if (!id) {
        // ? Post
        response = await firstValueFrom(this.http.post<IResponse>(`${this.baseUrl}/Scripture/MasterCreate`, payload));
      } else {
        // ? Put
        const updatePayload = { ...payload, id };
        response = await firstValueFrom(this.http.put<IResponse>(`${this.baseUrl}/Scripture/MasterUpdate/${id}`, updatePayload));
      }

      if (response.rsCode === RsCode.Ok) this.masterList.reload();
      else {
        throw response;
      }
      return response;

    } catch (err: unknown) {
      if (err instanceof HttpErrorResponse) {
        console.log('status:', err.status);
        console.log('error:', err.error); // 서버 body
        console.log('message:', err.error?.message);
        console.log('stack', err.error.stack);

      }
      if (err instanceof Error) {
        console.log('message', err.message);
        throw err; // 원본 유지
      }
      throw new Error(String(err));
    }
  }

  // * DELETE Master
  public async masterDelete(id: number): Promise<IResponse> {
    try {
      const response = await firstValueFrom(this.http.delete<IResponse>(`${this.baseUrl}/Scripture/MasterDelete/${id}`));
      if (response.rsCode === RsCode.Ok) this.masterList.reload();
      else throw new Error(response.rsMessage);
      return response;
    } catch (err: any) {
      throw err;
    }
  }
  // #endregion

  // --> Paragraph

  // #region ScriptureParagraph

  // * Get All Content
  public paragraphList = httpResource<IScriptureParagraph[]>(() => `${this.baseUrl}/Scripture/GetParagraphList`);


  public paragraphReadWithMaster(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/Scripture/Paragraph/${id}`);
  }

  // * POST, PUT Paragraph
  public async paragraphCreateOrUpdate(payload: IScriptureParagraph, id?: number): Promise<IResponse> {
    try {
      let response: IResponse;
      if (!id) {
        // ? Post
        response = await firstValueFrom(this.http.post<IResponse>(`${this.baseUrl}/Scripture/ParagraphCreate`, payload));
      } else {
        // ? Put
        const updatePayload = { ...payload, id };
        response = await firstValueFrom(this.http.put<IResponse>(`${this.baseUrl}/Scripture/ParagraphUpdate/${id}`, updatePayload));
      }

      if (response.rsCode === RsCode.Ok) this.paragraphList.reload();
      else throw new Error(response.rsMessage);
      return response;
    } catch (err: any) {
      throw err;
    }
  }

  // * READ Paragraph
  public paragraphRead(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/Scripture/ParagraphRead/${id}`);
  }

  // * DELETTE Paragraph
  public async paragraphDelete(id: number): Promise<IResponse> {
    try {

      const response = await firstValueFrom(this.http.delete<IResponse>(`${this.baseUrl}/Scripture/ParagraphDelete/${id}`));
      if (response.rsCode === RsCode.Ok) this.paragraphList.reload();
      else throw new Error(response.rsMessage);

      return response;

    } catch (err: any) {
      throw err;
    }
  }

  // #endregion



}

// if (error instanceof Error) {
//   // It's safe to access standard Error properties like 'message'
//   console.error('Caught a standard error:', error.message);
// } else if (error && typeof error === 'object' && 'status' in error) {
//   // Handle specific types of errors, e.g., HTTP errors from an interceptor
//   console.error('Caught an HTTP error with status:', (error as any).status);
// } else {
//   // Handle other unknown types of errors
//   console.error('An unknown error occurred:', error);
// }
// throw error;
