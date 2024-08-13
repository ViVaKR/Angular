import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICode } from '@app/interfaces/i-code';
import { ICodeResponse } from '@app/interfaces/i-code-response';
import { environment } from '@env/environment.development';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  baseUrl = environment.baseUrl;

  public isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDeleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isElement: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public subject = new Subject<ICode[]>();

  constructor(private http: HttpClient) { }

  //* subject
  next(value: ICode[]) {
    this.subject.next(value);
  }
  updated(value: boolean) {
    this.isUpdated.next(value);
  }

  //* Get all
  getCodes(): Observable<ICode[]> {
    return this.http.get<ICode[]>(`${this.baseUrl}/api/code/list`);
  }

  //* Get
  getCodeById = (id: number): Observable<ICode> => this.http.get<ICode>(`${this.baseUrl}/api/code/${id}`);

  //* Post
  postCode(code: ICode): Observable<ICodeResponse> {
    return this.http.post<ICodeResponse>(`${this.baseUrl}/api/code`, code);
  }

  //* Update
  updateCode(id: number, code: ICode): Observable<ICodeResponse> {
    return this.http.put<ICodeResponse>(`${this.baseUrl}/api/code/${id}`, code);
  }

  //* Delete
  deleteCode(id: number): Observable<ICodeResponse> {
    return this.http.delete<ICodeResponse>(`${this.baseUrl}/api/code/${id}`);
  }
}
