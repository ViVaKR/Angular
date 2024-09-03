import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBible } from '@app/interfaces/i-bible';
import { IResponse } from '@app/interfaces/i-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibleService {

  baseUrl = 'https://localhost:55531/';
  http = inject(HttpClient);

  getBibles(): Observable<IBible[]> {
    return this.http.get<IBible[]>(`${this.baseUrl}api/bible`);
  }

  postBible(bible: IBible): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}api/bible`, bible);
  }
}
