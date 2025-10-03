# CSR vs SSR

---

### Angular의 두 가지 모드: 브라우저 모드 (CSR) vs 서버 모드 (SSR)

Angular 애플리케이션은 기본적으로 **브라우저 모드(Client-Side Rendering, CSR)**로 실행되지만, 네 프로젝트처럼 **서버 모드(Server-Side Rendering, SSR)**, 즉 Angular Universal을 통해 서버에서 렌더링될 수도 있어. 이 두 가지 모드는 애플리케이션이 초기 콘텐츠를 사용자에게 전달하는 방식과 성능, SEO 등 여러 면에서 큰 차이를 보여.

#### 1. 브라우저 모드 (Client-Side Rendering, CSR)

이것이 우리가 일반적으로 알고 있는 Angular 애플리케이션의 동작 방식이야.

- **설명:** 웹 서버는 최소한의 HTML 파일(주로 `index.html`), CSS, 그리고 JavaScript 파일을 브라우저로 전송해. 브라우저는 이 JS 파일을 다운로드하고 실행하여, 이때부터 Angular 애플리케이션이 동적으로 DOM을 조작하고 화면을 렌더링하기 시작해.
- **동작 방식:**
  1.  사용자가 URL 요청.
  2.  서버는 빈 `index.html`과 JS/CSS 파일을 전송.
  3.  브라우저는 JS 파일을 다운로드하고 실행.
  4.  JS가 실행되면서 Angular 앱이 부트스트랩되고, 데이터를 가져와서 DOM을 구성하고 화면에 콘텐츠를 표시.
- **장점:**
  - **풍부한 상호작용성:** JS가 로드된 후에는 모든 라우팅과 상호작용이 브라우저에서 빠르게 처리돼.
  - **서버 부하 감소:** 서버는 정적 파일만 제공하므로, 렌더링에 대한 부담이 없어.
  - **PWA(Progressive Web App) 구현 용이:** 오프라인 기능 등을 쉽게 추가할 수 있어.
- **단점:**
  - **느린 초기 로드 시간 (Perceived Performance):** 사용자는 JS가 완전히 다운로드되고 실행되기 전까지 빈 화면이나 로딩 스피너를 보게 돼.
  - **SEO 불리:** 검색 엔진 크롤러가 JS를 실행하기 전까지는 콘텐츠를 제대로 파악하기 어려울 수 있어. (최근 검색 엔진들은 JS 실행 능력 향상되었지만 여전히 한계가 있어).
  - **초기 접근성 문제:** JS가 비활성화된 환경에서는 앱이 제대로 동작하지 않을 수 있어.
- **언제 사용하는가:**
  - 로그인 후 사용하는 내부 대시보드, 관리자 페이지 등 초기 SEO나 로딩 속도가 크게 중요하지 않은 경우.
  - 모바일 앱처럼 강력한 상호작용성과 PWA 기능이 핵심인 경우.

#### 2. 서버 모드 (Server-Side Rendering, SSR, Angular Universal)

네 프로젝트가 사용하는 방식이야. Angular 애플리케이션이 브라우저로 가기 전에 서버(주로 Node.js)에서 한 번 렌더링돼.

- **설명:** 사용자가 페이지를 요청하면, 서버에서 Angular 애플리케이션을 실행하고, 해당 페이지의 **완전히 렌더링된 HTML 스냅샷**을 생성해 브라우저로 전송해. 브라우저는 이 HTML을 즉시 표시할 수 있고, 이와 동시에 JavaScript 파일을 다운로드해. JS가 로드되면 Angular는 서버가 보낸 HTML을 "하이드레이션(Hydration)"하여 앱을 인터랙티브하게 만들지.
- **동작 방식 (네 프로젝트 기준):**
  1.  사용자가 URL 요청 (`npm run serve:ssr:text-or-kr`로 실행된 `server.ts`가 요청을 받음).
  2.  `server.ts`의 Express 서버는 `AngularNodeAppEngine`을 통해 `main.server.ts`를 부트스트랩하고 Angular 애플리케이션을 Node.js 환경에서 실행.
  3.  Angular 앱은 해당 라우트에 대한 데이터를 가져오고 컴포넌트들을 렌더링하여 **완전한 HTML 문자열**을 생성.
  4.  Express 서버는 이 HTML 문자열과 함께 애플리케이션의 JavaScript/CSS 파일을 브라우저로 전송.
  5.  브라우저는 전송받은 HTML을 즉시 화면에 표시. 사용자는 빈 화면이 아닌 실제 콘텐츠를 보게 됨.
  6.  브라우저가 JS 파일을 다운로드하고 실행하면, Angular는 이미 존재하는 HTML을 재활용(Hydration)하여 모든 이벤트를 연결하고 애플리케이션을 완전히 동적으로 만듦.
- **`angular.json` 및 `package.json` 설정과의 연결:**
  - `"server": "src/main.server.ts"`: 서버에서 Angular 앱을 부트스트랩할 진입점을 지정.
  - `"outputMode": "server"`: 빌드 시 SSR 결과물(서버용 JS 번들)을 생성하도록 지시.
  - `"ssr": { "entry": "src/server.ts" }`: SSR 빌드 과정에서 Node.js 서버 파일의 진입점을 지정. 이 파일(`server.ts`)이 실제로 Express 서버를 구동하고 Angular 앱을 렌더링하는 역할을 해.
  - `"serve:ssr:text-or-kr": "node dist/text-or-kr/server/server.mjs"`: 이 스크립트가 바로 빌드된 Node.js 서버 파일을 실행하여 SSR 모드로 애플리케이션을 서비스하는 명령어야.
- **장점:**
  - **빠른 초기 로드 속도 (Perceived Performance):** 사용자는 빈 화면 없이 즉시 콘텐츠를 볼 수 있어 사용자 경험이 향상돼.
  - **SEO 최적화:** 검색 엔진 크롤러가 JS 실행 없이도 완전한 HTML 콘텐츠를 파악할 수 있어 SEO에 매우 유리해.
  - **접근성 향상:** JS가 비활성화된 환경에서도 기본 콘텐츠를 볼 수 있어.
- **단점:**
  - **서버 부하 증가:** 모든 요청에 대해 서버에서 Angular 앱을 렌더링해야 하므로 서버 리소스가 더 많이 소모돼.
  - **복잡한 설정 및 개발:** 클라이언트와 서버 환경의 차이(`window`, `document` 객체 사용 제한 등)로 인해 개발 시 고려할 점이 많아져.
  - **TTFB(Time To First Byte) 증가 가능성:** 서버에서 렌더링하는 시간만큼 첫 바이트를 받는 시간이 길어질 수 있어.
- **언제 사용하는가:**
  - 블로그, 뉴스 사이트, 전자상거래 등 SEO와 초기 콘텐츠 로딩 속도가 중요한 대중에게 공개되는 웹사이트.
  - 첫 화면에서 많은 정보를 보여줘야 하는 경우.

---

### 단적인 차이를 보여주는 예시: 데이터 페칭

가장 극명한 차이는 **"최초 로드 시 HTML 소스"**에서 나타나. API로부터 데이터를 가져와 화면에 표시하는 간단한 예시를 통해 보여줄게.

**시나리오:** `AppComponent`에서 초기 데이터를 비동기적으로 가져와 `<h3>` 태그에 표시한다고 가정하자.

#### 1. 코드 준비

먼저, 간단한 데이터 서비스와 컴포넌트를 만들어보자.

**`src/app/data.service.ts`** (데이터를 가져오는 서비스)

```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getInitialData(): Observable<string> {
    // 2초 지연을 시뮬레이션하여 네트워크 지연을 가정합니다.
    return of('서버 또는 클라이언트에서 로드된 초기 데이터').pipe(delay(2000));
  }
}
```

**`src/app/app.component.ts`**

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
    <h1>나의 Angular 앱</h1>
    <div *ngIf="platform === 'browser'">현재 브라우저 환경입니다.</div>
    <div *ngIf="platform === 'server'">현재 서버 환경입니다.</div>
    <div *ngIf="data$ | async as data; else loading">
      <h3>{{ data }}</h3>
    </div>
    <ng-template #loading>
      <p>데이터 로딩 중...</p>
    </ng-template>
  `,
  styles: `
    h1 { color: #3f51b5; }
    h3 { color: #00796b; }
    p { color: #d32f2f; }
  `,
})
export class App implements OnInit {
  dataService = inject(DataService);
  platformId = inject(PLATFORM_ID); // 현재 플랫폼 ID 주입

  data$!: Observable<string>;
  platform: string;

  constructor() {
    // 플랫폼을 확인하여 메시지를 출력
    if (isPlatformBrowser(this.platformId)) {
      this.platform = 'browser';
    } else if (isPlatformServer(this.platformId)) {
      this.platform = 'server';
    } else {
      this.platform = 'unknown';
    }
  }

  ngOnInit(): void {
    console.log(`[${this.platform}] App Component initialized. Fetching data...`);
    this.data$ = this.dataService.getInitialData();
  }
}
```

**`src/app/app.config.ts`**

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser'; // Hydration 활성화

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(), // 클라이언트 하이드레이션 제공
  ],
};
```

**`src/app/app.config.server.ts`**

```typescript
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { provideServerRendering } from '@angular/platform-server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), // 서버 렌더링 제공
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

#### 2. 각 모드별 실행 및 결과 비교

**A. 브라우저 모드 (CSR) 실행 (`ng serve`)**

1.  터미널에서 `ng serve` 실행.
2.  브라우저에서 `http://localhost:4200` 접속.
3.  개발자 도구 (크롬 기준: `Ctrl+Shift+I` 또는 `F12`)를 열고 "Network" 탭으로 이동.
4.  페이지를 새로고침하고, "Elements" 탭에서 `<body>` 내용을 확인.

**예상 결과:**

- **초기 화면:** "데이터 로딩 중..." 메시지가 약 2초간 표시된 후, "서버 또는 클라이언트에서 로드된 초기 데이터"가 나타남.
- **"Elements" 탭에서 확인되는 초기 HTML (`2초 동안`):**
  ```html
  <app-root _nghost-ng-c123456789="">
    <h1>나의 Angular 앱</h1>
    <div _ngcontent-ng-c123456789="">현재 브라우저 환경입니다.</div>
    <p _ngcontent-ng-c123456789="">데이터 로딩 중...</p>
  </app-root>
  ```
  (실제 데이터는 JS가 실행되고 API 호출이 완료된 후에야 DOM에 추가됨)
- **"Elements" 탭에서 확인되는 최종 HTML (`2초 후`):**
  ```html
  <app-root _nghost-ng-c123456789="">
    <h1>나의 Angular 앱</h1>
    <div _ngcontent-ng-c123456789="">현재 브라우저 환경입니다.</div>
    <h3 _ngcontent-ng-c123456789="">서버 또는 클라이언트에서 로드된 초기 데이터</h3>
    <!-- 로딩 p 태그는 제거됨 -->
  </app-root>
  ```
- **`console.log` 출력:** `[browser] App Component initialized. Fetching data...`

**B. 서버 모드 (SSR) 실행 (`npm run serve:ssr:text-or-kr`)**

1.  먼저, 프로젝트를 빌드해야 해: `ng build`
    - 이 명령은 클라이언트(browser) 번들과 서버(server) 번들을 모두 생성해.
2.  빌드된 서버 파일을 실행: `npm run serve:ssr:text-or-kr`
3.  브라우저에서 `http://localhost:4000` (server.ts에서 설정된 기본 포트) 접속.
4.  개발자 도구 ("Elements" 탭)를 열고 `<body>` 내용을 확인.

**예상 결과:**

- **초기 화면:** `2초간`의 로딩 시간 없이 **즉시** "서버 또는 클라이언트에서 로드된 초기 데이터"가 표시됨. 그리고 약 2초 후에 클라이언트 JS가 로드되어 앱이 완전히 인터랙티브해짐.
- **"Elements" 탭에서 확인되는 초기 HTML (페이지 로드 직후):**
  ```html
  <app-root _ngcontent-ng-c123456789="" ng-version="20.3.3" ng-server-context="ssr">
    <h1>나의 Angular 앱</h1>
    <div _ngcontent-ng-c123456789="">현재 서버 환경입니다.</div>
    <h3 _ngcontent-ng-c123456789="">서버 또는 클라이언트에서 로드된 초기 데이터</h3>
  </app-root>
  ```
  (데이터가 이미 HTML에 포함되어 있어!)
- **`console.log` 출력:**
  - 서버 터미널 (Node.js 서버 실행 중인 곳): `[server] App Component initialized. Fetching data...`
  - 브라우저 개발자 도구 콘솔: `[browser] App Component initialized. Fetching data...`
    (서버에서 한 번, 클라이언트에서 하이드레이션 과정 중 한 번 총 두 번 출력됨)

#### 핵심 차이점 요약:

| 특징            | 브라우저 모드 (CSR)                  | 서버 모드 (SSR)                                                           |
| :-------------- | :----------------------------------- | :------------------------------------------------------------------------ |
| **초기 화면**   | 빈 화면 -> 로딩 스피너 -> 콘텐츠     | **즉시 콘텐츠 표시**                                                      |
| **초기 HTML**   | `app-root` 태그만 있거나 로딩 메시지 | **모든 콘텐츠가 포함된 완성된 HTML**                                      |
| **SEO**         | 불리 (JS 실행 후 크롤링)             | **유리** (크롤러가 바로 콘텐츠 인식)                                      |
| **첫 페인트**   | JS 다운로드 및 실행 후               | **HTML 다운로드 후 즉시**                                                 |
| **개발 환경**   | `ng serve`                           | `ng build` 후 `npm run serve:ssr:text-or-kr`                              |
| **플랫폼 감지** | `isPlatformBrowser`만 true           | 서버에서 `isPlatformServer` true, 클라이언트에서 `isPlatformBrowser` true |

---

이 예시를 통해 네가 Angular의 클라이언트 모드와 서버 모드 간의 명확한 차이점을 이해할 수 있었으면 좋겠어! 특히 `isPlatformBrowser`와 `isPlatformServer`를 활용하면 특정 로직을 클라이언트에서만 실행하거나 서버에서만 실행하도록 제어할 수 있다는 것도 기억해 둬.

사랑하는 친구야, 언제든지 또 궁금한 것이 있다면 뽀빠이를 불러줘! 항상 네 곁에서 도와줄게! 💪❤️
