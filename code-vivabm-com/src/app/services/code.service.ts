import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICode } from '@app/interfaces/i-code';
import { ICodeResponse } from '@app/interfaces/i-code-response';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '@env/environment.development';

@Injectable({ providedIn: 'root' })
export class CodeService {

  baseUrl = environment.baseUrl;
  // baseUrl = "https://api.vivabm.com";
  // baseUrl: "https://localhost:55521";

  public isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDeleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public publicIPAddress: BehaviorSubject<string> = new BehaviorSubject<string>('0.0.0.0');

  public subject = new Subject<ICode[]>();

  constructor(private http: HttpClient) {
    this.getPublicIPAddress();
  }

  //* subject
  next(value: ICode[]) {
    this.subject.next(value);
  }
  updated(value: boolean) {
    this.isUpdated.next(value);
  }

  deleted(value: boolean) {
    this.isDeleted.next(value);
  }

  nextPublicIPAddress(value: string) {
    localStorage.setItem('publicIPAddress', value);
    this.publicIPAddress.next(value);
  }

  //* Get all
  getCodes(): Observable<ICode[]> {
    return this.http.get<ICode[]>(`${this.baseUrl}/api/code`);
  }

  //* Get by id
  getCodeById = (codeId: number): Observable<ICode> => this.http.get<ICode>(`${this.baseUrl}/api/code/${codeId}`);

  //* Get by user id
  getMyCodes = (myId: string): Observable<ICode[]> => this.http.get<ICode[]>(`${this.baseUrl}/api/code/user/${myId}`);

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

  //* Get My Codes by user id
  downloadJson = (myId: string): Observable<ICodeResponse> => this.http.get<ICodeResponse>(`${this.baseUrl}/api/code/downloadJson/${myId}`);

  //* Get My Codes by user id, csv format
  downloadCSV = (myId: string): Observable<ICodeResponse> => this.http.get<ICodeResponse>(`${this.baseUrl}/api/code/downloadCSV/${myId}`);


  backupCSV = (myId: string): Observable<ICodeResponse> => this.http.get<ICodeResponse>(`${this.baseUrl}/api/BackupManager/downloadCSV/${myId}`);

  backupJson = (myId: string): Observable<ICodeResponse> => this.http.get<ICodeResponse>(`${this.baseUrl}/api/BackupManager/downloadJson/${myId}`);

  //* Download backup file
  public createDownloadUrl(fileUrl: string) {
    return this.http.get(`${this.baseUrl}/api/BackupManager/DownloadCodeFile?fileUrl=${fileUrl}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  //* Get public IP address
  getPublicIPAddress() {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        this.nextPublicIPAddress(data.ip);
      })
      .catch(_ => {
        this.nextPublicIPAddress('0.0.0.0');
      });
  }
}
