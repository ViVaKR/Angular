import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICode } from '@app/interfaces/i-code';
import { ICodeResponse } from '@app/interfaces/i-code-response';
import { IIPResponse } from '@app/interfaces/i-ip-response';
import { BehaviorSubject, catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  baseUrl = environment.baseUrl;
  // baseUrl = "https://api.vivabm.com";
  // baseUrl: "https://localhost:55521";

  public isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDeleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isElement: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public publicIPAddress: BehaviorSubject<string> = new BehaviorSubject<string>('0.0.0.0');

  public subject = new Subject<ICode[]>();

  constructor(private http: HttpClient) { }

  //* subject
  next(value: ICode[]) {
    this.subject.next(value);
  }

  hideElement(value: boolean) {
    this.isElement.next(value);
  }

  updated(value: boolean) {
    this.isUpdated.next(value);
  }

  deleted(value: boolean) {
    this.isDeleted.next(value);
  }

  nextPublicIPAddress(value: string) {
    this.publicIPAddress.next(value);
  }

  //* Get all
  getCodes(): Observable<ICode[]> {
    return this.http.get<ICode[]>(`${this.baseUrl}/api/code`);
  }

  //* Get by id
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
