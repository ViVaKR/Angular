import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  baseURL = 'https://localhost:50011';

  constructor(private http: HttpClient) { }

  getMyPublicIp = (): Observable<string> =>
    this.http.get<string>(`${this.baseURL}/get-my-ip`)
      .pipe(map(ip => ip),
        catchError(error => {
          console.error('Error: ', error);
          return of('Error occurred while getting your public IP address.');
        })
      );
}
