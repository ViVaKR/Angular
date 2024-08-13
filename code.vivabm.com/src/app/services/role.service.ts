import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
  createRole = (role: IRoleCreateRequest): Observable<IRole> => this.http.post<IRole>(`${this.baseUrl}/api/role/create`, role);

  // Delete a role
  deleteRole = (id: string): Observable<IRole> => this.http.delete<IRole>(`${this.baseUrl}/api/role/delete/${id}`);

  // Assign a role
  assignRole = (role: IRoleAssignRequest): Observable<IRole> => this.http.post<IRole>(`${this.baseUrl}/api/role/assign`, role);
}



/*
api/role/assign
api/role/delete/{id}
api/role/create
api/role/list


*/
