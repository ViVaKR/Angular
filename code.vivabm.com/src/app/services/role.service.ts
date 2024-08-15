import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICodeResponse } from '@app/interfaces/i-code-response';
import { IResponse } from '@app/interfaces/i-response';
import { IRole } from '@app/interfaces/i-role';
import { IRoleAssignRequest } from '@app/interfaces/i-role-assign-request';
import { IRoleCreateRequest } from '@app/interfaces/i-role-create-request';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = environment.baseUrl;

  http = inject(HttpClient);

  // Get all roles
  getRoles = (): Observable<IRole[]> => this.http.get<IRole[]>(`${this.baseUrl}/api/role/list`);

  // Create a new role
  createRole = (role: IRoleCreateRequest): Observable<IResponse> => this.http.post<IResponse>(`${this.baseUrl}/api/role/create`, role);

  // Delete a role
  deleteRole = (id: string): Observable<IResponse> => this.http.delete<IResponse>(`${this.baseUrl}/api/role/delete/${id}`);

  // Assign a role
  assignRole = (role: IRoleAssignRequest): Observable<IResponse> => this.http.post<IResponse>(`${this.baseUrl}/api/role/assign`, role);
}

/*
api/role/assign
api/role/delete/{id}
api/role/create
api/role/list


*/
