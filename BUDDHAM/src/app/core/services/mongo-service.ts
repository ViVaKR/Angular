import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { IMongoTest } from '../interfaces/i-mongo-test';

@Injectable({ providedIn: 'root' })
export class MongoService {

  private baseUrl = environment.apiUrl;

  public testList = httpResource<IMongoTest[]>(() => `${this.baseUrl}/api/mongo/test`);
  public mongoPing = httpResource(() => `${this.baseUrl}/api/mongo/ping`);

}
