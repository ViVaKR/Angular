import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { IBuddhistTerm } from '../interfaces/i-buddhist-term';
import { IBuddhistTermDTO } from '../interfaces/i-buddhist-term-dto';
import { IResponse } from '../interfaces/i-response';
import { firstValueFrom } from 'rxjs';
import { RsCode } from '../enums/rs-code';

@Injectable({ providedIn: 'root' })
export class AboutService {
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl;

  // * ALL List BuddistTerm
  public termList = httpResource<IBuddhistTerm[]>(() => `${this.baseUrl}/About/BuddhistTermList`);

  // * POST BuddhistTerm
  public async termCreate(payload: IBuddhistTermDTO): Promise<IResponse> {
    const res = await firstValueFrom(this.http.post<IResponse>(
      `${this.baseUrl}/About/CreateBuddhistTerm`,
      payload
    ));

    if (res.rsCode === RsCode.Ok) this.termList.reload();
    else new Error(res.rsMessage);
    return res;
  }

  // * PUT
  public async termUpdate(payload: IBuddhistTerm, id: number): Promise<IResponse> {
    const updatePayload = { ...payload, id };
    const res = await firstValueFrom(this.http.put<IResponse>(
      `${this.baseUrl}/About/UpdateBuddistTerm/${id}`,
      updatePayload
    ));

    if (res.rsCode === RsCode.Ok) this.termList.reload();
    else new Error(res.rsMessage);
    return res;
  }

  // * DELETE
  public async delete(id: number): Promise<IResponse> {
    const res = await firstValueFrom(this.http.delete<IResponse>(
      `${this.baseUrl}/About/DeleteBuddistTerm/${id}`
    ));
    if (res.rsCode === RsCode.Ok) {
      this.termList.reload();
    }
    else new Error(res.rsMessage);
    return res;
  }
}
