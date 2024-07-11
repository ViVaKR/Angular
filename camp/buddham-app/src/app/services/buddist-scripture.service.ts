import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BuddhistScripture } from '@app/types/buddist-scripture'; // 경전 데이터 타입
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuddistScriptureService {

  BaseURL: string = "https://localhost:7183";

  constructor(private http: HttpClient) { }

  // [ GET ] `API/Sutras`
  // 모든 경전 데이터를 가져옵니다.
  getScriptures = (): Observable<BuddhistScripture[]> => this.http.get<BuddhistScripture[]>(`${this.BaseURL}/api/sutras`);

}
