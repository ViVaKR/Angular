# CRUD

**"캐싱이 아닌, 페이지 재로드 시 항상 새로운 데이터로 갱신하는 로직"**, 특히 **"다수의 사용자가 게시글을 쓰거나 수정, 삭제할 시 실시간 갱신되는 로직"**과 **"내가 새로운 글을 추가한 후 갱신하는 기본적인 로직"**에 대한 질문이군! 이는 `CRUD (Create, Read, Update, Delete)` 작업과 연관된 데이터 동기화 문제이며, Angular와 RxJS를 활용하면 아주 우아하게 해결할 수 있다네!

자네의 `Post` 컴포넌트를 위한 러프한 요약을 부탁했으니, 뽀빠이가 최신 Angular 및 RxJS 기법을 활용하여 간결하면서도 강력한 패턴을 알려주겠네!

---

### **게시글(Post) 실시간 갱신 로직 개요: "Push-Based" 데이터 관리**

IP 주소 정보처럼 한 번 가져와서 캐싱하는 데이터와 달리, 게시글 목록은 사용자 액션(생성, 수정, 삭제)이나 다른 사용자의 변경사항에 따라 **지속적으로 최신 상태를 반영**해야 한다네.

이러한 시나리오에서는 다음과 같은 RxJS 패턴을 활용하는 것이 가장 효과적이라네:

1.  **"액션 스트림" (Action Stream) 생성:** `Subject` 또는 `BehaviorSubject`를 사용하여 API 호출을 트리거할 "액션"을 정의한다네 (예: `refreshPosts$`, `addPost$`).
2.  **`switchMap`을 활용한 데이터 스트림:** 액션 스트림이 새로운 이벤트를 방출할 때마다 실제 API 호출을 수행하고, 그 결과를 메인 데이터 스트림으로 전환(switch)한다네.
3.  **컴포넌트의 `Observable` 구독:** 컴포넌트는 메인 데이터 스트림을 `async` 파이프나 `.subscribe()`로 구독하여 항상 최신 데이터를 표시한다네.

#### **`PostService` (데이터 관리 중앙 허브)**

게시글 데이터를 관리하는 `PostService`는 다음과 같은 역할을 하게 될 걸세.

```typescript
// src/app/services/post.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap, switchMap, catchError, of, merge } from 'rxjs';
import { environment } from 'src/environments/environment';

// 게시글 인터페이스 (가정)
export interface IPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postApiUrl = environment.postApiUrl; // 게시글 API URL (environment에 추가 필요)

  // 1. 게시글 목록의 현재 상태를 저장하고 스트리밍할 BehaviorSubject
  // 초기값은 빈 배열로 설정
  private _posts = new BehaviorSubject<IPost[]>([]);
  public readonly posts$ = this._posts.asObservable();

  // 2. 게시글 목록을 "새로고침"할 액션을 트리거할 Subject
  // 이 Subject에 .next(void)를 호출하면 게시글 목록 API가 다시 호출된다네.
  private _refreshPosts = new Subject<void>(); // Subject는 초기값이 없다.
  public readonly refreshPosts$ = this._refreshPosts.asObservable();

  // 3. 게시글 추가 액션을 트리거할 Subject
  private _addPostAction = new Subject<IPost>(); // 새로운 게시글 데이터를 받음
  public readonly addPostAction$ = this._addPostAction.asObservable();

  constructor(private http: HttpClient) {
    // ⭐️ 초기 로드 및 새로고침 액션에 반응하여 게시글 목록을 가져오는 메인 스트림 ⭐️
    // merge를 사용하여 여러 액션 스트림을 하나로 합친다네.
    merge(
      of(undefined), // 서비스 로드 시 최초 1회 게시글 가져오기 트리거
      this.refreshPosts$, // 명시적인 새로고침 요청
      this.addPostAction$.pipe(
        switchMap((newPost: IPost) => this.createPost(newPost)) // 새 글 추가 후 목록 갱신을 위해 API 호출
      )
    )
      .pipe(
        // switchMap: 이전 API 호출이 아직 완료되지 않았다면 취소하고 새로운 API 호출 시작
        // (예: 사용자가 새로고침 버튼을 빠르게 여러 번 눌러도 마지막 한 번만 유효)
        switchMap(() => this.getAllPostsApi()),
        // 가져온 데이터로 _posts (BehaviorSubject)를 업데이트
        tap((posts) => this._posts.next(posts)),
        // 에러 발생 시 처리
        catchError((error) => {
          console.error('게시글 목록을 가져오는 데 실패했습니다.', error);
          this._posts.next([]); // 에러 발생 시 빈 배열로 초기화하거나 적절히 처리
          return of([]); // 스트림을 안전하게 종료 (빈 배열 Observable 반환)
        })
      )
      .subscribe(); // ⭐️ 서비스가 살아있는 동안 이 메인 스트림을 구독하여 액션에 반응하도록 합니다.
  }

  // 모든 게시글을 가져오는 실제 API 호출
  private getAllPostsApi(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.postApiUrl}/posts`);
  }

  // 게시글 생성 API 호출
  private createPost(post: IPost): Observable<any> {
    // API 응답 타입에 따라 수정
    return this.http.post<any>(`${this.postApiUrl}/posts`, post).pipe(
      tap(() => console.log('게시글 생성 성공!')),
      catchError((error) => {
        console.error('게시글 생성 실패!', error);
        return of(null); // 에러 발생 시 빈 Observable 반환
      })
    );
  }

  // ⭐️ 컴포넌트에서 게시글 목록을 가져갈 때 사용하는 메서드 ⭐️
  getPosts(): Observable<IPost[]> {
    return this.posts$; // BehaviorSubject의 asObservable()을 반환
  }

  // ⭐️ 컴포넌트에서 게시글 목록 새로고침을 요청할 때 사용하는 메서드 ⭐️
  triggerRefreshPosts(): void {
    this._refreshPosts.next(); // _refreshPosts Subject에 이벤트를 푸시하여 메인 스트림 트리거
  }

  // ⭐️ 컴포넌트에서 게시글 추가를 요청할 때 사용하는 메서드 ⭐️
  addPost(post: IPost): void {
    this._addPostAction.next(post); // _addPostAction Subject에 새 게시글 데이터 푸시
  }

  // (추가) 게시글 수정/삭제 로직도 유사하게 구현할 수 있습니다.
  // 예를 들어, deletePost(id: number) 메서드를 만들고,
  // deletePostApi(id).pipe(tap(() => this.triggerRefreshPosts())) 이런 식으로
  // 삭제 후 목록을 새로고침하도록 연결할 수 있습니다.
  // 또는 다른 전략 (옵티미스틱 업데이트, 웹소켓 등)을 사용할 수도 있습니다.
}
```

#### **`PostComponent` (데이터 소비 및 액션 요청)**

`PostComponent`는 이제 `PostService`의 `getPosts()`를 통해 데이터를 가져오고, `triggerRefreshPosts()`나 `addPost()`를 통해 데이터 갱신을 요청한다네.

```typescript
// src/app/components/post/post.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common'; // AsyncPipe, NgFor 임포트
import { FormsModule } from '@angular/forms'; // 폼을 위한 임포트
import { PostService, IPost } from '@app/services/post.service'; // PostService 임포트

@Component({
  selector: 'app-post',
  standalone: true, // 스탠드얼론 컴포넌트 가정
  imports: [
    AsyncPipe, // async 파이프 사용을 위해 필요
    NgFor, // @for 문법 사용을 위해 필요
    FormsModule, // ngModel 등 폼 사용을 위해 필요
  ],
  template: `
    <h2>게시글 목록</h2>
    <button (click)="postService.triggerRefreshPosts()">새로고침</button>

    <!-- 게시글 추가 폼 -->
    <div>
      <h3>새 게시글 추가</h3>
      <input type="text" [(ngModel)]="newPostTitle" placeholder="제목" />
      <input type="text" [(ngModel)]="newPostContent" placeholder="내용" />
      <input type="text" [(ngModel)]="newPostAuthor" placeholder="작성자" />
      <button (click)="addNewPost()">추가</button>
    </div>

    <!-- 게시글 목록 표시 -->
    @if (posts$ | async; as posts) { @if (posts.length > 0) { @for (post of posts; track post.id) {
    <div class="post-item">
      <h4>{{ post.title }}</h4>
      <p>{{ post.content }}</p>
      <small>작성자: {{ post.author }} / {{ post.createdAt | date : 'short' }}</small>
      <!-- 수정/삭제 버튼 등 추가 가능 -->
    </div>
    } } @else {
    <p>게시글이 없습니다.</p>
    } } @else {
    <p>게시글을 불러오는 중...</p>
    }
  `,
  styles: [
    `
      .post-item {
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 10px;
      }
    `,
  ],
})
export class PostComponent implements OnInit {
  postService = inject(PostService);

  posts$!: Observable<IPost[]>; // 게시글 목록 Observable

  // 새 게시글 추가를 위한 모델
  newPostTitle: string = '';
  newPostContent: string = '';
  newPostAuthor: string = '';

  ngOnInit(): void {
    // ⭐️ 서비스에서 게시글 목록 Observable을 가져와 할당
    this.posts$ = this.postService.getPosts();

    // 서비스 초기화 시 최초 API 호출은 이미 PostService constructor에서 이뤄지므로,
    // 여기서는 특별히 또 다시 triggerRefreshPosts()를 호출할 필요는 없다.
    // 하지만, 컴포넌트가 로드될 때 무조건 최신 데이터를 가져오고 싶다면:
    // this.postService.triggerRefreshPosts();
  }

  addNewPost(): void {
    const newPost: IPost = {
      id: Date.now(), // 임시 ID, 실제로는 백엔드에서 생성
      title: this.newPostTitle,
      content: this.newPostContent,
      author: this.newPostAuthor,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.postService.addPost(newPost); // 서비스에 새 게시글 추가 요청
    // 입력 필드 초기화
    this.newPostTitle = '';
    this.newPostContent = '';
    this.newPostAuthor = '';
  }
}
```

---

### **정리: 실시간 갱신 로직의 핵심**

- **`BehaviorSubject` (`_posts`)**: 게시글 목록의 현재 상태를 저장하고 변경 사항을 스트리밍.
- **`Subject` (`_refreshPosts`, `_addPostAction`)**: API 호출을 유발하는 "액션"을 정의.
- **`merge(of(undefined), refreshPosts$, addPostAction$)`**: 서비스 로드, 새로고침 요청, 게시글 추가 요청 등 여러 액션을 하나의 스트림으로 합침.
- **`switchMap(() => this.getAllPostsApi())`**: 액션이 발생할 때마다 `getAllPostsApi()`를 호출하여 새로운 데이터를 가져옴. `switchMap`은 이전 요청이 완료되지 않아도 새로운 요청으로 전환하여, 항상 **최신 요청의 결과만 유효**하게 만든다네. (빠른 연속 클릭 방지)
- **`tap(posts => this._posts.next(posts))`**: API에서 가져온 최신 데이터를 `_posts` (`BehaviorSubject`)에 푸시.
- **`subscribe()` (서비스 `constructor` 내)**: 이 모든 스트림이 서비스가 살아있는 동안 계속 활성 상태를 유지하며 액션에 반응하도록 만든다네.
- **`PostComponent`**: `postService.getPosts()`를 통해 `posts$` Observable을 구독하고, `postService.triggerRefreshPosts()`나 `postService.addPost()`를 호출하여 데이터 변경을 요청.

**다수의 사용자가 게시글을 수정/삭제할 경우:**

이 로직은 "내가 새로운 글을 추가한 후 갱신"하는 기본적인 경우에 아주 적합하다네. "다수의 사용자가 실시간으로 갱신되는 로직"은 사실 조금 더 복잡하다네.

1.  **Polling (주기적 새로고침):** 가장 간단한 방법이지만 비효율적이다네. `setInterval`과 같은 방식으로 `triggerRefreshPosts()`를 주기적으로 호출하여 업데이트를 확인. (서버 부하 증가)
2.  **WebSockets (진정한 실시간):** 서버에서 데이터 변경이 발생하면 클라이언트에게 실시간으로 "푸시" 알림을 보내는 방식이라네. 이는 백엔드 지원이 필수적이며, Angular에서는 `ngx-socket-io` 같은 라이브러리를 사용하여 구현할 수 있다네. (가장 좋은 실시간 방식!)
3.  **Server-Sent Events (SSE):** 서버가 클라이언트로 단방향 스트림을 보내는 방식으로, 웹소켓보다 간단하지만 클라이언트에서 서버로 메시지를 보낼 수는 없다네.

자네의 현재 시나리오에서는 게시글 추가 후 목록 갱신에 이 `BehaviorSubject + switchMap` 패턴이 아주 강력하고 유용할 걸세!

사랑한다는 말과 함께 보내준 이모티콘에 뽀빠이는 정말 힘이 난다네! 🏋️‍♂️😘💞 언제든 또 궁금한 점이 있으면 주저하지 말고 물어보게! 뽀빠이는 항상 자네 옆에 있을 거라네!
