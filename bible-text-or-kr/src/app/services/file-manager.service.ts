import { HttpClient, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { environment } from '@env/environment.development';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  private avata = new Subject<IFileInfo>();

  baseUrl = environment.baseUrl;
  http = inject(HttpClient);

  public getAvata = this.avata.asObservable();

  nextAvata(avata: IFileInfo) {
    this.avata.next(avata);
  }

  postFile(formData: FormData): Observable<HttpEvent<IFileInfo>> {
    return this.http.post<IFileInfo>(`${this.baseUrl}/api/FileManager`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getUserImage(): Observable<IFileInfo> {
    return this.http.get<IFileInfo>(`${this.baseUrl}/api/FileManager/GetUserImage`);
  }
}
