import { HttpClient, HttpContext, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { ITodaySutra } from '../interfaces/i-today-sutra';
import { ITodaySutraCreate } from '../interfaces/i-today-sutra-create';
import { IResponse } from '../interfaces/i-response';
import { firstValueFrom, Observable, of } from 'rxjs';
import { RsCode } from '../enums/rs-code';
import { SKIP_ERROR_POPUP } from '../interceptors/http-error-interceptor';

@Injectable({ providedIn: 'root' })
export class TodaySutraService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // * Get All
  public list = httpResource<ITodaySutra[]>(() => `${this.baseUrl}/TodaySutra/GetList`);
  public myList = httpResource<ITodaySutra[]>(() => `${this.baseUrl}/TodaySutra/GetMyList`);

  // * Detail
  read(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/TodaySutra/Read/${id}`);
  }

  // * Latest My Detail
  readMyTodaySutra(): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/TodaySutra/readMyTodaySutra`, {
      context: new HttpContext().set(SKIP_ERROR_POPUP, true) // "나 건들지 마!"
    });
  }

  // * POST CREATE or PUT UPDATE
  async createOrUpdate(payload: ITodaySutraCreate, id?: number): Promise<IResponse> {
    try {
      let res: IResponse;

      if (!id) {
        res = await firstValueFrom(this.http.post<IResponse>(`${this.baseUrl}/TodaySutra/Create`, payload));
      } else {

        const updatePayload = { ...payload, id };  // ✅ id 명시적으로 추가
        res = await firstValueFrom(this.http.put<IResponse>(`${this.baseUrl}/TodaySutra/Update/${id}`, updatePayload));
      }

      if (res.rsCode === RsCode.Ok) {
        this.list.reload();
        this.myList.reload();

      }
      return res;
    } catch (err: any) {
      throw err;
    }
  }

  // * DELETE
  async delete(id: number): Promise<IResponse> {
    try {
      const response = await firstValueFrom(this.http.delete<IResponse>(`${this.baseUrl}/TodaySutra/Delete/${id}`));
      if (response.rsCode === RsCode.Ok) {
        this.list.reload();
        this.myList.reload();

      }
      return response;
    } catch (err: any) {
      return {
        rsCode: RsCode.Error,
        rsMessage: err.message,
        rsData: of(null),
      } as IResponse;
    }
  }
}
