import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MirrorOfMindService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

}
