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
  baseUrl = "https://api.buddham.co.kr";
  // baseUrl = "https://localhost:48591";

  http = inject(HttpClient);

  getRoles = (): Observable<Role[]> => this.http.get<Role[]>(`${this.baseUrl}/api/roles`);

  createRole(role: RoleCreateRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/api/roles`, role);
  }

  deleteRole(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/api/roles/${id}`);
  }

  assignRole(userId: string, roleId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/api/roles/assign`, { userId, roleId });
  }
}
