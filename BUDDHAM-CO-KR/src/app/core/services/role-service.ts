import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IRole } from '@app/core/interfaces/i-role';
import { environment } from '@env/environment.development';
import { firstValueFrom, of } from 'rxjs';
import { IResponse } from '../interfaces/i-response';
import { RsCode } from '../enums/rs-code';

@Injectable({ providedIn: 'root' })
export class RoleService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  public searchQuery = signal('');

  // * READ - httpResource,
  public roleList = httpResource<IRole[]>(() => `${this.baseUrl}/role/list`);

  // httpResource가 signal 변화 감지하고 자동 재요청!
  public searchRoles = httpResource<IRole[]>(() => {
    const query = this.searchQuery();
    return `${this.baseUrl}/role/list?.search=${query}`;
  })

  // * Detail
  public roleDetail = (id: string) => httpResource<IRole>(() => `${this.baseUrl}/role/${id}`);

  // * POST or PUT
  async createOrUpdateRole(role: IRole, id: string = ''): Promise<IResponse> {
    try {
      const response = (id === null || id === '')
        ? await firstValueFrom(this.http.post<IResponse>(`${this.baseUrl}/role/create`, role))
        : await firstValueFrom(this.http.put<IResponse>(`${this.baseUrl}/role/update`, role));

      if (response.rsCode === RsCode.Ok) this.roleList.reload();
      return response
    } catch (err: any) {
      return {
        rsCode: RsCode.Error,
        rsMessage: err.message,
        rsData: of(null),
      } as IResponse;
    }
  }

  // * DELETE
  async deleteRole(name: string): Promise<IResponse> {
    try {
      const response = await firstValueFrom(this.http.delete<IResponse>(`${this.baseUrl}/role/delete/${name}`));

      if (response.rsCode === RsCode.Ok) this.roleList.reload();
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
