import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '@app/interfaces/i-response';
import { ITodayMessage } from '@app/interfaces/i-today-message';
import { environment } from '@env/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodayMessageService {

  baseUrl = environment.baseURL;

  http = inject(HttpClient);

  public message: BehaviorSubject<IResponse> = new BehaviorSubject<IResponse>({
    success: false,
    message: '',
    data: {
      id: 0,
      userId: '',
      message: '',
    }
  });

  currentMessage = this.message.asObservable();

  public next(value: IResponse) {
    this.message.next(value);
  }

  //* Get all
  getMessages = (): Observable<ITodayMessage[]> => this.http.get<ITodayMessage[]>(`${this.baseUrl}/api/todaymessage`);

  //* Get by id
  getMessageById = (id: number): Observable<ITodayMessage> => this.http.get<ITodayMessage>(`${this.baseUrl}/api/todaymessage/${id}`);

  //* Get by userId
  getMessageByUserId = (userId: any): Observable<IResponse> => this.http.get<IResponse>(`${this.baseUrl}/api/todaymessage/user/${userId}`);

  //* Post/
  postMessage(data: ITodayMessage): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/api/todaymessage`, data);
  }
}
