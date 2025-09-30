# Caching

---

### **`IpService` 캐싱 로직 요약 (개요)**

우리가 구현한 `IpService`의 캐싱 로직은 다음과 같은 목적으로 설계되었다네:

1.  **API 호출 최적화:** `Home` 컴포넌트든 다른 컴포넌트든, 여러 곳에서 IP 정보가 필요하더라도 실제 외부 API (`http://localhost:5130/api/ip`) 호출은 앱 생애 주기 동안 **단 한 번만** 일어나도록 한다네.
2.  **데이터 공유 및 동기화:** API에서 가져온 IP 정보를 앱의 여러 컴포넌트가 **실시간으로 공유**하고, 데이터가 업데이트될 때마다 자동으로 최신 정보를 받도록 한다네.
3.  **컴포넌트 독립성:** `Home` 컴포넌트가 다른 페이지로 이동했다가 다시 돌아와 재생성되더라도, IP 정보는 서비스 레벨에 **캐싱되어 유지**되므로 다시 API를 호출할 필요 없이 즉시 이전 정보를 받아볼 수 있다네.

이 목적을 달성하기 위해 RxJS의 강력한 오퍼레이터들과 `BehaviorSubject`를 조합해서 사용했다네.

**주요 구성 요소 및 작동 방식:**

1.  **`private _ipInfo = new BehaviorSubject<IIpInfo | null>(null);`**

    - **역할:** 이 `BehaviorSubject`는 IP 정보의 **"현재 상태 저장소"**이자 **"데이터 스트림"**의 역할을 한다네.
    - `null`로 초기화되어 있으며, `_ipInfo.next(data)`를 통해 새로운 IP 정보가 들어오면 이 Subject를 구독하는 모든 곳에 최신 값을 푸시한다네.
    - 새로운 구독자는 생성되는 즉시 `BehaviorSubject`가 가지고 있는 **최신 값 (현재는 `null`)**을 받게 된다네.

2.  **`public readonly ipInfo$ = this._ipInfo.asObservable();`**

    - **역할:** `_ipInfo`(`BehaviorSubject`)의 데이터를 외부(컴포넌트 등)에서 **안전하게 구독**할 수 있도록 `Observable` 형태로 노출한다네.
    - `asObservable()`을 사용하는 이유는 외부에서 실수로 `_ipInfo.next()`를 호출하여 서비스의 상태를 변경하는 것을 방지하기 위함이라네 (`BehaviorSubject`의 내부 상태를 보호하는 것이지).

3.  **`private _cachedIpAddress$: Observable<IIpInfo>;` (그리고 파이프라인)**

    - **역할:** 이 `Observable`은 실제 외부 API 호출(`this.http.get(...)`)을 담당하며, 그 결과를 `BehaviorSubject`에 연결하고 캐싱하는 역할을 한다네.
    - **`tap(data => { this._ipInfo.next(data); })`**: HTTP 요청이 성공적으로 완료되면, 가져온 `data`를 `_ipInfo` (`BehaviorSubject`)에 푸시하여 내부 상태를 업데이트하고, 이를 구독하는 모든 곳에 최신 정보를 알린다네.
    - **`catchError(...)`**: HTTP 요청 중 에러가 발생하면, 에러를 처리하고 `_ipInfo`에 에러 상태를 나타내는 기본값을 푸시한다네. 이렇게 함으로써 에러가 발생해도 앱이 멈추지 않고, 사용자에게 에러 상황을 표시할 수 있다네.
    - **`shareReplay({ bufferSize: 1, refCount: true })`**: **이것이 캐싱의 핵심!**
      - `bufferSize: 1`: 마지막으로 방출된 값 1개를 기억(캐싱)하라는 의미라네.
      - `refCount: true`: "참조 카운트"를 사용하라는 의미라네. 즉, 이 `_cachedIpAddress$`를 구독하는 `Observable` 스트림이 최소 1개 이상 있을 때만 원본 `http.get` Observable을 활성화하고 (API 호출), 모든 구독자가 없어지면 원본 `Observable`을 비활성화(API 요청 취소)하여 자원을 절약한다네.
        - **중요:** `refCount: true`는 모든 구독자가 끊기면 캐시도 사라질 수 있다는 의미이므로, 서비스가 살아있는 동안 캐시를 유지하려면 서비스 `constructor`에서 `_cachedIpAddress$.subscribe()`를 통해 최소 하나의 "숨겨진" 구독을 유지해야 한다고 설명했지? 이것이 바로 **서비스가 로드될 때 API 요청을 한 번만 발생시키고 그 결과를 `_ipInfo`에 채우는** 우리 로직의 핵심이었네!

4.  **`constructor(...)` 내의 `this._cachedIpAddress$.subscribe();`**
    - **역할:** 이 한 줄이 **실제로 `http.get` API 호출을 트리거하는 역할**을 한다네!
    - `IpService`가 Angular의 주입기(Injector)에 의해 생성되는 순간, 이 `subscribe()` 호출 덕분에 `_cachedIpAddress$`가 활성화되고, HTTP 요청이 한 번 발생하여 IP 정보를 가져오게 된다네. 가져온 정보는 `tap` 오퍼레이터를 통해 `_ipInfo`(`BehaviorSubject`)에 저장되지.
    - 결과적으로, `Home` 컴포넌트가 `this.ipService.getIpInfo()` (즉, `_ipInfo.asObservable()`)를 구독하면, 이미 `_ipInfo`에 캐싱된 IP 정보를 즉시 받아볼 수 있게 된다네!

---

### **`localStorage` 활용 방법과 비교**

자네가 `localStorage`를 활용했던 기억도 있다고 했으니, 이 두 가지 캐싱 방법을 비교해 보자고!

**1. `localStorage`를 이용한 캐싱:**

- **작동 방식:** 데이터를 브라우저의 로컬 저장소에 문자열 형태로 직접 저장하고 필요할 때 가져오는 방식이라네.

  ```typescript
  // 예시
  const CACHE_KEY = 'cachedIpInfo';

  getIpAddress(): Observable<IIpInfo> {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return of(JSON.parse(cached)); // 캐시된 데이터가 있으면 즉시 반환
    } else {
      return this.http.get<IIpInfo>(`${this.ipAddressUrl}/api/ip`).pipe(
        tap(data => localStorage.setItem(CACHE_KEY, JSON.stringify(data))), // API 호출 후 캐시 저장
        catchError(error => { /* ... */ return of(null); })
      );
    }
  }
  ```

- **장점:**

  - **영구성 (Persistence):** 브라우저가 닫혔다가 다시 열려도 데이터가 남아있다네. 사용자 세션을 넘어 데이터를 유지해야 할 때 유용하지.
  - **단순함:** RxJS 오퍼레이터를 깊이 이해하지 않아도 쉽게 구현할 수 있다네.

- **단점:**
  - **비반응성 (Non-Reactive):** `localStorage`의 값이 변경되어도 이를 구독하는 컴포넌트가 자동으로 업데이트되지 않는다네. 변경 사항을 감지하려면 `storage` 이벤트를 리스닝하거나 주기적으로 `localStorage`를 확인하는 복잡한 로직이 필요하지. (이것이 가장 큰 단점!)
  - **동기적 (Synchronous):** `getItem()`, `setItem()` 메서드가 동기적으로 작동하므로, 저장된 데이터가 매우 클 경우 UI 스레드를 잠깐 블록할 수 있다네.
  - **직렬화/역직렬화 (Serialization/Deserialization):** 모든 데이터는 문자열로 저장되어야 하므로, 객체는 `JSON.stringify()`로 직렬화하고 가져올 때는 `JSON.parse()`로 역직렬화해야 한다네.
  - **보안 취약점:** XSS(Cross-Site Scripting) 공격에 취약할 수 있으므로 민감한 정보를 저장하는 것은 피해야 한다네.
  - **수동적인 갱신:** API 데이터가 변경되었을 때 `localStorage`의 캐시를 언제 무효화하고 다시 가져올지 로직을 직접 구현해야 한다네 (예: 캐시 저장 시 타임스탬프 함께 저장).

**2. `BehaviorSubject` + `shareReplay`를 이용한 캐싱 (현재 구현 방식):**

- **작동 방식:** 서비스 내부 메모리에 API 호출 결과를 캐싱하고, 이 캐싱된 데이터를 `BehaviorSubject`를 통해 `Observable` 스트림으로 제공하는 방식이라네.

- **장점:**

  - **반응성 (Reactive):** `BehaviorSubject`를 통해 데이터가 변경될 때마다 이를 구독하는 모든 컴포넌트가 자동으로 최신 값을 받아 UI를 업데이트할 수 있다네. Angular의 반응형 프로그래밍 패러다임과 완벽하게 일치하지.
  - **성능:** 메모리 기반 캐싱이므로 `localStorage`보다 훨씬 빠르다네. HTTP 요청도 `shareReplay` 덕분에 한 번만 발생한다네.
  - **RxJS 통합:** `catchError`, `tap` 등 강력한 RxJS 오퍼레이터를 사용하여 에러 처리, 사이드 이펙트 관리 등을 깔끔하게 처리할 수 있다네.
  - **SSR 호환성:** 서버 사이드 렌더링(SSR) 환경에서도 잘 작동한다네 (클라이언트/서버 간 상태 동기화는 별도 고려).
  - **자동 자원 관리:** `refCount: true` 옵션을 통해 구독자가 없을 때 자원을 해제할 수 있다네.

- **단점:**
  - **비영구성 (Non-Persistent):** 앱이 새로고침되거나 브라우저가 닫히면 메모리 캐시가 사라진다네. 즉, 세션 기반 데이터에 적합하지.
  - **RxJS 지식 요구:** `Observable`, `BehaviorSubject`, `shareReplay` 같은 RxJS 개념에 대한 이해가 필요하다네.

### **결론 (어떤 방법을 선택할 것인가?)**

- **IP 주소 정보와 같이 "현재 세션"에서 한 번만 가져오고, 여러 컴포넌트에서 실시간으로 공유하며, 컴포넌트가 재생성되어도 값이 유지되어야 하는 데이터**의 경우, **`BehaviorSubject` + `shareReplay`** 방식이 단연 **최고의, 가장 Angular스러운 해결책**이라네! 자네가 현재 적용한 방식이지!
- 만약 "사용자 설정", "로그인 상태" 등 **브라우저를 닫았다가 다시 열어도 유지되어야 하는 데이터**라면, `localStorage` 또는 `sessionStorage` (세션이 끝나면 사라짐)를 고려할 수 있다네. 하지만 이 경우에도 `localStorage`의 값을 `BehaviorSubject`에 로드하여 앱 내에서는 반응형으로 다루는 것이 최적의 조합이 될 수 있다네 (예: `BehaviorSubject`의 초기값을 `localStorage`에서 가져옴).

자네의 IP 주소 시나리오에는 `BehaviorSubject`와 `shareReplay`를 이용한 인메모리 캐싱이 완벽하게 들어맞는다네! 이제 이 캐싱 로직이 왜 최선인지, 그리고 `localStorage`와는 어떤 차이가 있는지 완벽하게 이해했을 걸세! 뽀빠이가 이렇게 도움이 될 수 있어서 정말 기쁘다네, 내 친구! 💪💖
