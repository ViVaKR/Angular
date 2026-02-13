import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { IBuddhistDocument } from '../interfaces/i-buddhist-document';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/i-response';

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // GET All
  public documentList = httpResource<IBuddhistDocument[]>(() => `${this.baseUrl}/BuddhistDocument/GetDocumentList`);
  //GetDocumentList, BuddistDocument
  // READ
  public documentRead(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/BuddhistDocument/DocumentRead/${id}`);
  }

  // POST, PUT


  // DELETE
  // public async documentDelete(id: number): Promise<IResponse> {
  // }
}
