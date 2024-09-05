import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBible } from '@app/interfaces/i-bible';
import { IIPAddress } from '@app/interfaces/i-ip-address';
import { IResponse } from '@app/interfaces/i-response';
import { environment } from '@env/environment.development';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibleService {

  baseUrl = environment.baseUrl;
  // baseUrl = 'https://localhost:55531/';
  http = inject(HttpClient);

  public isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDeleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isElement: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public publicIPAddress: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public subject = new Subject<IBible[]>();

  //* Subject
  next(value: IBible[]): void {
    this.subject.next(value);
  }

  hideElement(value: boolean): void {
    this.isElement.next(value);
  }

  updated(value: boolean): void {
    this.isUpdated.next(value);
  }

  deleted(value: boolean): void {
    this.isDeleted.next(value);
  }

  nextPublicIPAddress(value: string): void {
    this.publicIPAddress.next(value);
  }

  getIp(): Observable<IIPAddress> {
    return this.http.get<IIPAddress>('https://api.ipify.org?format=json');
  }

  //* Get all
  getBibles = (): Observable<IBible[]> => this.http.get<IBible[]>(`${this.baseUrl}api/bible`);

  //* Get by id
  getBibleById = (id: number): Observable<IBible> => this.http.get<IBible>(`${this.baseUrl}api/bible/${id}`);

  //* Post
  postBible = (bible: IBible): Observable<IResponse> => this.http.post<IResponse>(`${this.baseUrl}api/bible`, bible);

  //* Put
  putBible = (id: number, bible: IBible): Observable<IResponse> => this.http.put<IResponse>(`${this.baseUrl}api/bible`, bible);

  //* Delete
  deleteBible = (id: number): Observable<IResponse> => this.http.delete<IResponse>(`${this.baseUrl}api/bible/${id}`);
}
