import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '@app/interfaces/i-response';
import { IRole } from '@app/interfaces/i-role';
import { IRoleAssignRequest } from '@app/interfaces/i-role-assign-request';
import { IRoleCreateRequest } from '@app/interfaces/i-role-create-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = "https://api.vivabm.com";
  // baseUrl: "https://localhost:55521";
  // baseUrl = "https://localhost:55521";

  http = inject(HttpClient);

  //? Get all roles
  getRoles = (): Observable<IRole[]> => this.http.get<IRole[]>(`${this.baseUrl}/api/role/list`);

  //? Create a new role
  createRole = (role: IRoleCreateRequest): Observable<IResponse> => this.http.post<IResponse>(`${this.baseUrl}/api/role/create`, role);

  //? Delete a role
  deleteRole = (id: string): Observable<IResponse> => this.http.delete<IResponse>(`${this.baseUrl}/api/role/delete/${id}`);

  //? Assign a role
  assignRole = (role: IRoleAssignRequest): Observable<IResponse> => this.http.post<IResponse>(`${this.baseUrl}/api/role/assign`, role);
}
