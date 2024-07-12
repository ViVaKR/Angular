import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BuddistScripture } from '@app/types/buddist-scripture'

@Injectable({
  providedIn: 'root'
})
export class BuddhaService {

  baseURL: string = "https://localhost:7183";

  constructor(private http: HttpClient) { }

  //--> Get All
  getScriptures = (): Observable<BuddistScripture[]> =>
    this.http.get<BuddistScripture[]>(`${this.baseURL}/api/sutras`)

  //--> Create New
  addScripture = (data: BuddistScripture): Observable<BuddistScripture> => // Add a new data
    this.http.post<BuddistScripture>(`${this.baseURL}/api/sutras`, data);

  //--> Get By Id
  getScriptureById = (id: number): Observable<BuddistScripture> =>
    this.http.get<BuddistScripture>(`${this.baseURL}/api/sutras/${id}`);
}
