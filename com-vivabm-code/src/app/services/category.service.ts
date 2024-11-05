import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/i-category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment.development';
import { SkipLoading } from '@app/helper/skip-loading-token';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //--> Get all categories
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}/api/category/list`, {
      context: new HttpContext().set(SkipLoading, true)
    });
  }
}
