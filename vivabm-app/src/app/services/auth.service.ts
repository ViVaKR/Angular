import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  baseUrl = environment.baseUrl;
  http = inject(HttpClient);

  constructor() { }

  // Get Details
  getDetails() {
    return this.http.get(`${this.baseUrl}/api/account/details`);
  }
}
