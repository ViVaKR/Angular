import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IObject } from '@app/interfaces/i-object';
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

    // const req = new HttpRequest(
    //   'POST',
    //   `${this.baseUrl}/api/sutraimage`,
    //   formData,
    //   {
    //     headers: new HttpHeaders({ 'content-type': 'multipart/form-data' }),
    //     reportProgress: true,
    //     responseType: 'json',
    //   }
    // );
    //'Content-Type':'multipart/form-data'
    // let headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    // const headers = new HttpHeaders().set('encrypt', 'multipart/form-data');
    let headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    const url = `${this.baseUrl}/api/sutraimage/upload`;
    return this.http.post<IResponse>(url, formData, { headers: headers, });
    // return this.http.post<IResponse>(`${this.baseUrl}/api/sutraimage`, formData, { headers: headers, }
    // return this.http.request(req).asObservable<IResponse>();
  }

  uploadFile(collectionID: string, data: FormData): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    return this.http.patch<IResponse>(`${this.baseUrl}`, data, { headers: headers })
  }
}
