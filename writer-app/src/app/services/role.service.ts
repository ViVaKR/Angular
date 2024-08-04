import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Role } from '@app/interfaces/role';
import { RoleCreateRequest } from '@app/interfaces/role-create-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl = "https://localhost:50011";

  http = inject(HttpClient);

  getRoles = (): Observable<Role[]> => this.http.get<Role[]>(`${this.apiUrl}/api/roles`);

  createRole(role: RoleCreateRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/api/roles`, role);
  }

  deleteRole(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/api/roles/${id}`);
  }

  assignRole(userId: string, roleId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/api/roles/assign`, { userId, roleId });
  }
}
