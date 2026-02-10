import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { IBuddhistTerm } from '../interfaces/i-buddhist-term';
import { IResponse } from '../interfaces/i-response';
import { firstValueFrom } from 'rxjs';
import { RsCode } from '../enums/rs-code';

@Injectable({ providedIn: 'root' })
export class AboutService {
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl;

  // * ALL List BuddistTerm
  public termList = httpResource<IBuddhistTerm[]>(() => `${this.baseUrl}/About/BuddhistTermList`);

  // * POST, PUT BuddhistTerm
  public async termCreateOrUpdate(payload: IBuddhistTerm, id?: number): Promise<IResponse> {

    try {
      let res: IResponse;
      if (!id) {
        // ? Post
        res = await firstValueFrom(this.http.post<IResponse>(`${this.baseUrl}/About/CreateBuddhistTerm`, payload));
      } else {
        // ? Put
        const updatePayload = { ...payload, id };
        res = await firstValueFrom(this.http.put<IResponse>(`${this.baseUrl}/About/UpdateBuddhistTerm/${id}`, updatePayload));
      }

      if (res.rsCode === RsCode.Ok) this.termList.reload();
      else throw new Error(res.rsMessage);
      return res;
    } catch (err: any) {
      throw err;
    }
  }

  // * DELETE BuddhistTerm
  public async termDelete(id: number): Promise<IResponse> {
    const res = await firstValueFrom(this.http.delete<IResponse>(
      `${this.baseUrl}/About/DeleteBuddhistTerm/${id}`
    ));
    if (res.rsCode === RsCode.Ok) {
      this.termList.reload();
    }
    else new Error(res.rsMessage);
    return res;
  }
}
