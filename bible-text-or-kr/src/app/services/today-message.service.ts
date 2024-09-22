import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '@app/interfaces/i-response';
import { ITodayMessage } from '@app/interfaces/i-today-massage';
import { environment } from '@env/environment.development';
import { BehaviorSubject, identity, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodayMessageService {

  baseUrl = environment.baseUrl;
  // baseUrl = 'https://localhost:55531'

  http = inject(HttpClient);

  //* Get all
  getMessages(): Observable<ITodayMessage[]> {
    return this.http.get<ITodayMessage[]>(`${this.baseUrl}/api/todaymessage`);
  }

  //* Get by id
  getMessageById(id: number): Observable<ITodayMessage> {
    return this.http.get<ITodayMessage>(`${this.baseUrl}/api/todaymessage/${id}`);
  }
  //* Post/
  postMessage(data: ITodayMessage): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/api/todaymessage`, data);
  }
}
