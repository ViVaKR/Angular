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

  getScriptures = (): Observable<BuddistScripture[]> => this.http
    .get<BuddistScripture[]>(`${this.baseURL}/api/sutras`)
}
