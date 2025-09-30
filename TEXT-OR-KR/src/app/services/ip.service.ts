import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IIpInfo } from '@app/interfaces/i-ip-info';
import { BehaviorSubject, catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  ipAddressUrl = environment.ipAddressUrl;

  // IP 정보를 저장하고 스트리밍할 BehaivorSubject
  private _ipInfo = new BehaviorSubject<IIpInfo | null>(null);

  // 외부에서 구독할 수 있는 IP 정보 Observable
  // BehaviorSubject의 현재값을 바로 노출하지 않고 Observable 로 노출
  public readonly ipInfo$ = this._ipInfo.asObservable();

  // ⭐️ API 호출 결과를 캐싱할 Observable
  // 이 Observable을 통해 getIpAddress()가 호출될 때 실제 HTTP 요청이 한 번만 일어나게 한다네.
  private _cachedIpAddress$: Observable<IIpInfo>;


  constructor(private http: HttpClient) {
    // ⭐️ 서비스가 초기화될 때 한 번만 실제 API 호출을 시작하도록 설정
    // switchMap을 사용하여 BehaviorSubject에 값이 없으면 API를 호출하고,
    // 값이 있으면 캐싱된 값을 사용하도록 할 수도 있다네.
    // 하지만 여기서는 서비스가 로드될 때 무조건 한 번 호출하고 캐싱하는 것으로 해보자.

    this._cachedIpAddress$ = this.http.get<IIpInfo>(`${this.ipAddressUrl}/api/ip`).pipe(
      tap(data => {
        this._ipInfo.next(data);
      }),
      catchError(error => {
        console.error('IP 정보를 가져오는 데 실패했습니다 (서비스 캐싱).', error);
        // 에러 발생 시 BehaviorSubject에 에러 정보를 담은 기본값 푸시
        const errorIpInfo: IIpInfo = { ip: '0.0.0.0', city: '-', region: '-', country: '-', isp: '-' };
        this._ipInfo.next(errorIpInfo);
        // 에러를 다시 throw하거나 빈 Observable 반환하여 스트림을 안전하게 종료
        return of(errorIpInfo); // of()를 사용하여 Observable<IIpInfo> 반환
      }),

      // ⭐️⭐️⭐️ shareReplay(1) 핵심! ⭐️⭐️⭐️
      // 1: 마지막 1개의 값을 캐싱한다.
      // refCount: true (기본값): 구독자가 0이 되면 HTTP 요청도 취소된다 (메모리 해제).
      //            하지만 이 경우, 모든 구독자가 해지되면 다시 subscribe 할 때 HTTP 요청이 새로 발생할 수 있다.
      //            서비스 단에서 항상 캐싱된 값을 유지하려면 refCount: false (기본값)이 더 적합할 수 있다.
      //            여기서는 서비스가 살아있는 동안은 항상 캐싱된 값을 유지하도록 refCount: true 옵션을 줘보자.
      shareReplay({ bufferSize: 1, refCount: true })
      // refCount: true 는 구독자가 없으면 원본 Observable이 해제되고, 다시 구독하면 새로 호출된다.
      // 만약 서비스를 항상 유지하고 싶다면, shareReplay(1) 만 쓰거나,
      // 서비스 초기화 시 바로 subscribe()하여 캐싱을 강제하는 방법도 있다.
      // 여기서는 서비스 초기화 시 바로 구독하여 BehaviorSubject에 값을 넣고,
      // 컴포넌트는 BehaviorSubject를 구독하는 방식으로 가보자. (이게 더 깔끔)
    );

    this._cachedIpAddress$.subscribe();
  }

  // ⭐️ 이제 이 메서드는 직접 HTTP 요청을 하는 대신,
  // BehaviorSubject의 현재 값을 포함한 Observable을 반환한다.
  // 필요하다면 이 메서드를 통해 강제로 IP 정보를 새로고침하도록 만들 수도 있다.
  getIpInfo(): Observable<IIpInfo | null> {
    return this.ipInfo$;
  }

  refreshIpInfo(): void {
    this._cachedIpAddress$.subscribe(); // 다시 구독하여 API 호출을 트리거
  }

  // 기존 publicIpAddress BehaviorSubject는 더 이상 필요 없을 듯.
  // IIpInfo 전체를 다루는 _ipInfo 하나로 충분.
  // public publicIpAddress: BehaviorSubject<string> = new BehaviorSubject<string>('0.0.0.0');
  // nextPublicIPAddress(value: string) {
  //   this.publicIpAddress.next(value);
  // }
};
