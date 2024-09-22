import { HttpClient, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  baseUrl = environment.baseUrl;
  http = inject(HttpClient);

  postFile(formData: FormData): Observable<HttpEvent<IFileInfo>> {
    return this.http.post<IFileInfo>(`${this.baseUrl}/api/FileManager`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
