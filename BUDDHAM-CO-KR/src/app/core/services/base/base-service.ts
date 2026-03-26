import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';

@Injectable()
export abstract class BaseService<T> {
  protected http = inject(HttpClient);
  protected baseUrl = environment.apiUrl;
}
