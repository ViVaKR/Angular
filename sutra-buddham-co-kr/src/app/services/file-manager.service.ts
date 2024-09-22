import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '@app/interfaces/i-response';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  baseUrl = environment.baseURL;
  http = inject(HttpClient);
  postFile(formData: FormData): Observable<IResponse> {
    let headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    const url = `${this.baseUrl}/api/sutraimage/upload`;
    return this.http.post<IResponse>(url, formData, { headers: headers, });
  }

  uploadFile(collectionID: string, data: FormData): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    return this.http.patch<IResponse>(`${this.baseUrl}`, data, { headers: headers })
  }
}
