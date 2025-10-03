import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  platformId = inject(PLATFORM_ID); // PLATFORM_ID 주입

  getDemoData(): Observable<string> {

    let message = '초기 데이터';
    let currentDelay = 0;

    if (isPlatformServer(this.platformId)) {
      message = '서버에서 로드된 초기 데이터';
      currentDelay = 500;
    } else if (isPlatformBrowser(this.platformId)) {
      message = '브라우저에서 로드된 최종 데이터';
      currentDelay = 1500; // 클라이언트에서 데이터 가져오는 데 1.5 지연
    }
    return of(message).pipe(delay(currentDelay));
  }
}
