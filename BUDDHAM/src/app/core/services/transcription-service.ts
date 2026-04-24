import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { firstValueFrom, Observable } from 'rxjs';
import { IResponse } from '../interfaces/i-response';
import { RsCode } from '../enums/rs-code';
import { IScriptureContentCreate } from '../interfaces/i-scripture-content-create';
import { IScriptureContentRead } from '../interfaces/i-scripture-content-read';

@Injectable({ providedIn: 'root', })
export class TranscriptionService {
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl;

  // * Get All
  public contentList = httpResource<IScriptureContentRead[]>(() => `${this.baseUrl}/Scripture/GetContentList`);

  // * READ
  public contentRead(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/Scripture/ContentRead/${id}`);
  }

  // * POST
  public async contentCreate(payload: IScriptureContentCreate): Promise<IResponse> {
    try {
      let response: IResponse;
      response = await firstValueFrom(this.http.post<IResponse>(`${this.baseUrl}/Scripture/ContentCreate`, payload));
      if (response.rsCode === RsCode.Ok) this.contentList.reload();
      else throw new Error(response.rsMessage);

      return response;
    } catch (err: any) {
      throw err;
    }
  }

  // * PUT
  public async contentUpdate(payload: IScriptureContentCreate, id: number): Promise<IResponse> {
    try {
      let response: IResponse;
      const updatePayload = { ...payload, id };
      response = await firstValueFrom(this.http.put<IResponse>(`${this.baseUrl}/Scripture/ContentUpdate/${id}`, updatePayload));
      if (response.rsCode === RsCode.Ok) this.contentList.reload();
      else throw new Error(response.rsMessage);
      return response;
    } catch (err: any) {
      throw err;
    }
  }

  // * DELETE
  public async contentDelete(id: number): Promise<IResponse> {
    try {
      const response = await firstValueFrom(this.http.delete<IResponse>(`${this.baseUrl}/Scripture/contentDelete/${id}`));
      if (response.rsCode === RsCode.Ok) this.contentList.reload();
      else throw new Error(response.rsMessage);
      return response;
    } catch (err: any) {
      throw err;
    }
  }
}
