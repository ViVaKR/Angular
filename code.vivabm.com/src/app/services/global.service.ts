import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  baseUrl = "https://api.vivabm.com";
  http = inject(HttpClient);

  public ip = new BehaviorSubject<string>('0.0.0.0');

}
