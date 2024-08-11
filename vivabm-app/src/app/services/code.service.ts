import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICode } from '@app/interfaces/i-code';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  //--> Get all codes
  getCodes(): Observable<ICode[]> {
    return this.http.get<ICode[]>(`${this.baseUrl}/api/code/list`);
  }

  //--> Create New
  postCode(code: ICode): Observable<ICode> {
    return this.http.post<ICode>(`${this.baseUrl}/api/code/create`, code);
  }

  //--> Get Code by ID
  getCodeById = (id: number): Observable<ICode> => this.http.get<ICode>(`${this.baseUrl}/api/code/${id}`);

}
