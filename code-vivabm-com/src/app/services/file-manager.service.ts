import { HttpClient, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { environment } from '@env/environment.development';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileManagerService {

  private avata = new Subject<IFileInfo>();

  baseUrl = environment.baseUrl;

  http = inject(HttpClient);

  public getAvata = this.avata.asObservable();

  nextAvata(avata: IFileInfo) {
    this.avata.next(avata);
  }

  postFile(formData: FormData, choice: number): Observable<HttpEvent<IFileInfo>> {
    if (choice === 0) {
      return this.http.post<IFileInfo>(`${this.baseUrl}/api/FileManager/Upload`, formData, {
        reportProgress: true,
        observe: 'events'
      });
    } else {
      return this.http.post<IFileInfo>(`${this.baseUrl}/api/FileManager/UploadAttachImage`, formData, {
        reportProgress: true,
        observe: 'events'
      });
    }
  }

  getFile(): Observable<IFileInfo[]> {
    return this.http.get<IFileInfo[]>(`${this.baseUrl}/api/file/download`, {});
  }

  getFileList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/FileManager/GetFileList`);
  }

  public download(fileUrl: string) {
    return this.http.get(`${this.baseUrl}/api/FileManager/Download?fileUrl=${fileUrl}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  public downloadCodeFile(fileUrl: string) {
    return this.http.get(`${this.baseUrl}/api/FileManager/DownloadCodeFile?fileUrl=${fileUrl}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  postCodeImage(formData: FormData): Observable<HttpEvent<IFileInfo>> {
    const url = `${this.baseUrl}/api/FileManager/PostCodeImage`;
    const req = this.http.post<IFileInfo>(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
    return req;
  }

  getUserImage(): Observable<IFileInfo> {
    return this.http.get<IFileInfo>(`${this.baseUrl}/api/FileManager/GetUserImage`);
  }

  getUserImageById(userId: string): Observable<IFileInfo> {
    return this.http.get<IFileInfo>(`${this.baseUrl}/api/FileManager/GetUserImageByUserId?userId=${userId}`);
  }
}
