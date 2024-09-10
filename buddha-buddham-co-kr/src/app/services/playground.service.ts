import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPlayGround } from '@app/interfaces/i-play-ground';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {
  baseUrl = environment.baseUrl;

  http = inject(HttpClient);


  postPlayground(data: IPlayGround): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/playground`, data);
  }
}
