import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { IBuddhistDocument } from '@app/core/interfaces/i-buddhist-document';
import { Observable } from 'rxjs';
import { IResponse } from '@app/core/interfaces/i-response';
import { IDocumentFilterParams } from '@app/core/interfaces/i-document-filter-params';
import { DocumentType } from '@app/core/enums/document-type';

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // GET All
  public documentList = httpResource<IBuddhistDocument[]>(() => `${this.baseUrl}/BuddhistDocument/GetDocumentList`);

  // 필터링 파라미터를 받는 방식으로 변경
  public documentFielteredList = httpResource<IBuddhistDocument[]>(
    (params?: IDocumentFilterParams) => {
      const queryParams = this.buildQueryParams(params);
      return `${this.baseUrl}/BuddhistDocument/GetDocumentList${queryParams}`;
    }
  );

  // 특정 타입만 가져오는 메서드
  public getDocumentsByType(type: DocumentType) {
    return this.http.get<IResponse>(
      `${this.baseUrl}/BuddhistDocument/GetDocuments?documentType=${type}`
    );
  }

  //GetDocumentList, BuddistDocument
  // READ
  public documentRead(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/BuddhistDocument/DocumentRead/${id}`);
  }

  // POST, PUT


  // DELETE
  // public async documentDelete(id: number): Promise<IResponse> {
  // }

  private buildQueryParams(params?: IDocumentFilterParams): string {
    if (!params) return '';
    const query = new URLSearchParams();
    if (params.documentType !== undefined) {
      query.append('documentType', params.documentType.toString());
    }

    if (params.isFreatured !== undefined) {
      query.append('isFeatured', params.isFreatured.toString());
    }

    // ... 다른 필터들

    return query.toString() ? `?${query.toString()}` : '';
  }
}
