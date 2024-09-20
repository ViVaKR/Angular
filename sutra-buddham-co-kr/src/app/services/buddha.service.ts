import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BuddistScripture } from '@app/types/buddist-scripture'
import { Sutra } from '@app/models/sutra';
import { environment } from '@env/environment.development';
import { IResponse } from '@app/interfaces/i-response';

@Injectable({ providedIn: 'root' })
export class BuddhaService {

  baseUrl = environment.baseURL;

  public isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDeleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isElement: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public subject = new Subject<Sutra[]>();

  constructor(private http: HttpClient) { }

  //--> subject
  next(value: Sutra[]) {
    this.subject.next(value);
  }

  //--> isDeleted
  hideElement(value: boolean) {
    this.isElement.next(value);
  }

  //--> isUpdated
  updated(value: boolean) {
    this.isUpdated.next(value);
  }

  //--> Get All by Sutras
  getSutras = (): Observable<Sutra[]> => this.http.get<Sutra[]>(`${this.baseUrl}/api/sutras`);

  //--> Create New
  postScripture = (data: BuddistScripture): Observable<IResponse> => // Add a new data
    this.http.post<IResponse>(`${this.baseUrl}/api/sutras`, data);

  //--> Get By Id
  getScriptureById = (id: number): Observable<IResponse> =>
    this.http.get<IResponse>(`${this.baseUrl}/api/sutras/${id}`);

  //--> Update By Id
  updateScripture = (id: number, data: BuddistScripture): Observable<IResponse> =>
    this.http.put<IResponse>(`${this.baseUrl}/api/sutras/${id}`, data);

  //--> Delete By Id
  deleteScripture = (id: number): Observable<IResponse> =>
    this.http.delete<IResponse>(`${this.baseUrl}/api/sutras/${id}`);

  // delete(id: number): Observable<BuddistScripture> {
  //   let result = this.http.delete<BuddistScripture>(`${this.baseUrl}/api/sutras/${id}`);
  //   return result;
  // }
}
