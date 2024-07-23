import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Role } from '@app/interfaces/role';
import { RoleCreateRequest } from '@app/interfaces/role-create-request';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = environment.apiURL;

  http = inject(HttpClient);

  constructor() { }

  getRoles = (): Observable<Role[]> => this.http.get<Role[]>(`${this.apiUrl}/roles`);

  createRole(role: RoleCreateRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/roles`, role);
  }

  // deleteRole = (id: string): Observable<{ message: string }> => this.http.delete<{ message: string }>(`${this.apiUrl}/roles/${id}`);
  deleteRole(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/roles/${id}`);

  }

  assignRole(userId: string, roleId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/roles/assign`, { userId, roleId });
  }
}
