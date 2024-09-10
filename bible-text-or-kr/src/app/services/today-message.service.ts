import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '@app/interfaces/i-response';
import { ITodayMassage } from '@app/interfaces/i-today-massage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodayMessageService {

  baseUrl = 'https://ip.text.or.kr';
  // baseUrl = 'https://localhost:55531'
  http = inject(HttpClient);

  constructor() { }


  //* Get all
  getBibles = (): Observable<ITodayMassage[]> => this.http.get<ITodayMassage[]>(`${this.baseUrl}/api/TodayMessage`);

  //* Get by id
  getBibleById = (id: number): Observable<ITodayMassage> => this.http.get<ITodayMassage>(`${this.baseUrl}/api/todaymessage/${id}`);

  //* Post/
  postBible = (data: ITodayMassage): Observable<IResponse> => this.http.post<IResponse>(`${this.baseUrl}/api/TodayMessage`, data);

  //* Put
  putBible = (id: number, bible: ITodayMassage): Observable<IResponse> => this.http.put<IResponse>(`${this.baseUrl}/api/todaymessage/${id}`, bible);

  //* Delete
  deleteBible = (id: number): Observable<IResponse> => this.http.delete<IResponse>(`${this.baseUrl}/api/todaymessage/${id}`);
}
