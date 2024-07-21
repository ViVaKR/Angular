import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Role } from '@app/interfaces/role';
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
}
