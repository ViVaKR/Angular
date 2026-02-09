import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { IBuddhistTerm } from '../interfaces/i-buddhist-term';

@Injectable({
  providedIn: 'root',
})
export class BuddhistTermService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // * Term
  public termList = httpResource<IBuddhistTerm[]>
}
