import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '@app/interfaces/i-response';
import { ITodayMassage } from '@app/interfaces/i-today-massage';
import { environment } from '@env/environment.development';
import { BehaviorSubject, identity, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodayMessageService {

  baseUrl = environment.baseUrl;
  // baseUrl = 'https://localhost:55531'

  http = inject(HttpClient);


  public message: BehaviorSubject<IResponse> = new BehaviorSubject<IResponse>({
    isSuccess: false,
    message: '',
    data: {
      id: 0,
      userId: '',
      message: '',
    }
  });
  currentMessage = this.message.asObservable();

  public next(value: IResponse): void {
    this.message.next(value);
  }

  //* Get all
  getMessages = (): Observable<ITodayMassage[]> => this.http.get<ITodayMassage[]>(`${this.baseUrl}/api/todaymessage`);

  //* Get by id
  getMessageById = (id: number): Observable<ITodayMassage> => this.http.get<ITodayMassage>(`${this.baseUrl}/api/todaymessage/${id}`);

  //* Get by userId
  getMessageByUserId = (userId: any): Observable<IResponse> => this.http.get<IResponse>(`${this.baseUrl}/api/todaymessage/user/${userId}`);

  //* Post/
  postMessage(data: ITodayMassage): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/api/todaymessage`, data);
  }

}
