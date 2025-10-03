import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.baseUrl;

  public publicIPAddress: BehaviorSubject<string> = new BehaviorSubject<string>('0.0.0.0');

  constructor(private http: HttpClient) {
    this.getPublicIPAddress();
  }

  // * Get All
  getText(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // * Get All IDs
  // getAllPostIds(): Observable<any> {
  //   return "hello";
  // }

  nextPublicIPAddress(value: string) {
    localStorage.setItem('publicIPAddress', value);

    this.publicIPAddress.next(value);
  }

  getIp(): string {
    return this.publicIPAddress.getValue();
  }

  getPublicIPAddress() {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        this.nextPublicIPAddress(data.ip);
      })
      .catch(_ => {
        this.nextPublicIPAddress('0.0.0.0');
      });
  }
}
