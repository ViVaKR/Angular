import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { environment } from '@env/environment.development';
import { catchError, Observable, scan } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  http = inject(HttpClient);

  baseUrl = environment.baseUrl;

  upload(formData: FormData): Observable<HttpEvent<IFileInfo>> {
    const url = `${this.baseUrl}/api/FileManager/UploadFile`;
    const req = this.http.post<IFileInfo>(url, formData, {
      reportProgress: true,
      observe: 'events',
    });

    return req;
  }
}
