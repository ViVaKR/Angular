import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OllamaService {
  private baseUrl = environment.apiUrl;

  askStream(question: string): Observable<string> {
    return new Observable(observer => {

      const url = `${this.baseUrl}/Demo/ask-stream?q=${encodeURIComponent(question)}`;
      const es = new EventSource(url);

      es.onmessage = (event) => {
        if (event.data === '[DONE]') {
          observer.complete();
          es.close();
          return;
        }

        try {
          // JSON.parse를 하면 ""\uC0AC""\uACBD"" -> "사경" 으로 정상 변환됩니다.
          const parsed = JSON.parse(event.data);
          observer.next(parsed); // ⬅️ event.data 대신 parsed를 전달!
        } catch (e) {
          observer.next(event.data); // 예외 처리
        }
      };


      es.onerror = (err) => {
        observer.error(err);
        es.close();
      };

      // 구독 해제 시 SSE 연결 종료
      return () => es.close();
    });
  }
}
