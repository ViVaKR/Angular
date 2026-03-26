import { Injectable } from '@angular/core';
import { ICanon } from '@interfaces/i-canon';
import { firstValueFrom, Observable } from 'rxjs';
import { IResponse } from '@interfaces/i-response';
import { RsCode } from '@enums/rs-code';
import { BaseGenericService } from '@services/base/base-generic-service';

@Injectable({ providedIn: 'root' })
export class DharmaService extends BaseGenericService<ICanon> {

  protected override resourcePath = 'Dharma/Canons';

  /**
   * Read
   * Canon
   */
  getCanonById(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/Dharma/CanonRead/${id}`);
  }

  /**
   * Delete
   * Canon
   */
  public async deleteCanon(id: number): Promise<IResponse> {
    const res = await firstValueFrom(
      this.http.delete<IResponse>(`${this.baseUrl}/Dharma/CanonDelete/${id}`)
    );
    if (res.rsCode === RsCode.Ok) this.reload();
    return res;
  }
}
