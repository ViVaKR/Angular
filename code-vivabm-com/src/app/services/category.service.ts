import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/i-category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment.development';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //--> Get all categories
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}/api/category/list`);
  }
}
