import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObserverService {

  // 기본 옵저버 생성 메서드
  createObserver<T>(
    context: string,
    onNext?: (value: T) => void,
    onError?: (error: any) => void,
    onComplete?: () => void
  ): Observer<T> {
    return {
      next: (value: T) => {
        onNext?.call(this, value);
      },
      error: (err: any) => {
        console.error(`[${context}] Error:`, err);
        onError?.call(this, err);
      },
      complete: () => {
        onComplete?.call(this);
      }
    }
  }

  // API 호출용 objserver
  createApiObserver<T>(
    successCallback?: (value: T) => void,
    errorCallback?: (error: any) => void
  ): Observer<T> {
    return {
      next: (data: T) => {
        successCallback?.call(this, data);
      },
      error: (err: any) => {
        console.error('[API Observer] Error:', err);
        errorCallback?.call(this, err) || this.handleDefaultError(err);
      },
      complete: () => {
        console.log('[API Observer] Complete');
      }
    }
  }

  private handleDefaultError(error: any): void {
    alert(`오류가 발생했습니다. ${error.message || error}`);
  }
}
