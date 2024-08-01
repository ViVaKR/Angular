import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDetail } from '../interfaces/user-detail';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = 'https://localhost:50011';
  private userKey = 'user';

  private _isSignIn = new BehaviorSubject<boolean>(false);
  private _isAdmin = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getUser = (): Observable<UserDetail[]> => this.http.get<UserDetail[]>(`${this.apiURL}/api/account/users`);
}
