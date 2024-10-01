import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IQna } from '@app/interfaces/i-qna';
import { environment } from '@env/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QnaService {

  baseUrl = environment.baseUrl;

  http = inject(HttpClient);

  private watchQna = new BehaviorSubject<IQna[]>([]);

  watchQna$ = this.watchQna.asObservable();

  nextWatchQna(qnas: IQna[]): void {
    this.watchQna.next(qnas);
  }

  // Get all QnA By CodeId
  // GET: api/Qna/GetQnaByCodeId/{codeId}
  getQnaByCodeId(codeId: number): Observable<IQna[]> {
    if (codeId === 0) {
      return new Observable<IQna[]>();
    }
    return this.http.get<IQna[]>(`${this.baseUrl}/api/Qna/${codeId}`);
  }

  // POST: api/Qna
  postQna(qna: IQna): Observable<IQna> {
    return this.http.post<IQna>(`${this.baseUrl}/api/Qna/Ask`, qna);
  }

  // Delete QnA By Id
  // DELETE: api/Qna/{id}
  deleteQnaById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Qna/${id}`);
  }
}
