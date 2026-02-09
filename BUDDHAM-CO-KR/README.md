# buddham.co.kr

## Dotnet vs JavaScript

```bash
pnpm exec ng config cli.packageManager pnpm
ng new test-pnpm --package-manager=pnpm
```

// JavaScript/RxJS → .NET 의미

filter() → Where()
map() → Select()
find() → First()
some() → Any()
every() → All()
reduce() → Aggregate()

forkJoin() → Task.WhenAll()
race() → Task.WhenAny()
concat() → 순차 실행 (await 반복)
merge() → Task.WhenAll() + 스트림 병합

pipe() → 메서드 체이닝
tap() → Do() / 부수효과
catchError() → try-catch
finalize() → finally

takeUntil() → CancellationToken
debounceTime() → Throttle
distinctUntilChanged() → Distinct()

---

// 1. 결과가 없을 때의 처리
FirstOrDefault() // 첫번째 또는 기본값
SingleOrDefault() // 하나만 또는 기본값
LastOrDefault() // 마지막 또는 기본값
// "OrDefault" - 천재적!

// 2. 조건부 실행
Where() // 조건에 맞는 곳
TakeWhile() // ~하는 동안 가져와
SkipWhile() // ~하는 동안 건너뛰어
// 자연스러운 영어!

// 3. 집계 함수
Sum() // 합계
Average() // 평균
Max() // 최대값
Min() // 최소값
Count() // 개수
// 짧고 명확!

// 4. 정렬
OrderBy() // ~로 정렬
OrderByDescending() // ~로 내림차순 정렬
ThenBy() // 그 다음 ~로
// 문장 같아!

// 5. 집합 연산
Union() // 합집합
Intersect() // 교집합
Except() // 차집합
Distinct() // 중복 제거
// 수학 용어 그대로!

// 6. 변환
Select() // 선택
SelectMany() // 많이 선택 (flatten)
Cast<T>() // 형변환
OfType<T>() // 타입만
// 직관적!

---

## 🎓 RxJS 학습 곡선:

```md
초보: subscribe() 남발 😅
↓
중급: pipe() 사용 시작 🤔
↓
고급: switchMap, catchError 활용 💪
↓
전문가: 중복 방지, 경쟁 상태 대응 🚀
↓
지금 여기! 🌟

🔹 map ↔ Select
🔹 filter ↔ Where
🔹 take ↔ Take
🔹 takeWhile ↔ TakeWhile
🔹 tap ↔ 로그/사이드 이펙트 (실제 LINQ 대응 없음)
🔹 first ↔ First
🔹 forkJoin ↔ Task.WhenAll
🔹 combineLatest ↔ CombineLatest
🔹 distinct ↔ Distinct
🔹 sort/group은 RxJS에 없지만 map 내부에서 구현 가능
```

auth.service → 로그인/로그아웃/토큰 관련 API 호출
auth.store → BehaviorSubject로 인증 상태(state) 관리
auth.interceptor → 모든 API 요청에 access token 자동 첨부
user.service → 사용자 정보 CRUD
user.store → 현재 유저 정보 상태 관리
profile-edit.component → 내 정보 수정

```typescript
count = toSignal(interval(1_000), { initialValue: 0 });

// Signal
// RxJS 의 Objsrevable 을 Angular 의 Signal 로 변환해 주는 함수
// 한마디로 '스트림(흐르는 물)' 을 '물통(현재 상태 값)' 으로 바꿔주는 역할
// 사용하는 이유
// 1. 템플릿(HTML) 에서  | async 파이프를 안 써도 됨 (코드 깔끔)
// 2. subscribe 를 명시적으로 할 필요가 없음
// 3. 변화를 더 정밀하게 감지하여 성능이 매우 좋아짐
ipData = toSignal(this.helperService.getPublicIpAddress(), {
  initialValue: {
    ip: '0.0.0.0',
    ipArray: ['0', '0', '0', '0'],
  },
});


외부 클릭시 드롭다운 닫기
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const clickedInside = target.closest('#avatarButton') ||
    target.closest('#userDropdown');

  if (!clickedInside && this.isDropdownOpen) {
    this.isDropdownOpen = false;
  }
}

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}
```

```bash
dotnet tool uninstall -g Microsoft.Web.LibraryManager.Cli
dotnet tool install -g Microsoft.Web.LibraryManager.Cli

libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js
```

오!! 좋은 질문이야! C# 배경이 있으면 더 헷갈릴 수 있어! 😄

## C# vs JavaScript/TypeScript Getter/Setter

### C# Property (명확한 목적)

```csharp
// 1. Backing field 캡슐화
private string _name;
public string Name {
    get => _name;
    set => _name = value?.Trim();
}

// 2. 자동 프로퍼티
public string Name { get; set; }

// 3. 계산된 프로퍼티
public string FullName => $"{FirstName} {LastName}";
```

**목적**: 필드 캡슐화, 검증, 계산

### TypeScript/JavaScript Getter (다른 목적!)

```typescript
// ❌ 나쁜 예 (일반 메서드와 차이 없음)
class Bad {
  getName(): string {
    return this.name;
  }
}
console.log(obj.getName()); // 메서드 호출

// ✅ 좋은 예 (속성처럼 사용)
class Good {
  get name(): string {
    return this._name;
  }
}
console.log(obj.name); // 속성 접근! (괄호 없음)
```

## JavaScript/TypeScript에서 Getter를 쓰는 이유

### 1. **속성처럼 보이게** (가장 중요!)

```typescript
class User {
  firstName = 'Kim';
  lastName = 'Bumjun';

  // 메서드 방식 (별로)
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Getter 방식 (좋음!)
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

const user = new User();
user.getFullName(); // ❌ 메서드처럼 보임
user.fullName; // ✅ 속성처럼 보임! (더 자연스러움)
```

### 2. **템플릿/바인딩에서 자연스러움**

```html
<!-- Angular 템플릿 -->
<div>{{ user.getFullName() }}</div>
❌ 괄호 필요
<div>{{ user.fullName }}</div>
✅ 속성처럼!

<!-- Vue, React도 마찬가지 -->
```

### 3. **Lazy Evaluation (지연 계산)**

```typescript
class ExpensiveCalculation {
  private _cachedResult?: number;

  // 호출할 때마다 계산 ❌
  calculate(): number {
    return this.heavyComputation();
  }

  // 필요할 때만 계산 + 캐싱 ✅
  get result(): number {
    if (!this._cachedResult) {
      this._cachedResult = this.heavyComputation();
    }
    return this._cachedResult;
  }
}

const calc = new ExpensiveCalculation();
calc.result; // 첫 호출: 계산함
calc.result; // 두번째: 캐시 사용
```

### 4. **Readonly 느낌 제공**

```typescript
class Config {
  private _apiUrl = 'https://api.example.com';

  // Getter만 있으면 읽기 전용처럼 보임
  get apiUrl(): string {
    return this._apiUrl;
  }

  // Setter 없음 = 외부에서 수정 불가
}

const config = new Config();
config.apiUrl; // ✅ 읽기 OK
config.apiUrl = 'xxx'; // ❌ 컴파일 에러!
```

### 5. **Angular Signal과의 조합** (요즘 트렌드)

```typescript
// 네가 쓴 코드!
export class BrowserService {
  private origin = signal('');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.origin.set(window.location.origin);
    }
  }

  // Getter로 signal을 속성처럼!
  get currentOrigin(): string {
    return this.origin(); // signal 호출 숨김
  }
}

// 사용할 때
service.currentOrigin; // ✅ 깔끔! signal()을 숨김
```

## 실전 가이드

### Getter를 써야 할 때 ✅

```typescript
// 1. 계산된 값
get fullName(): string {
  return `${this.firstName} ${this.lastName}`;
}

// 2. 상태 기반 값
get isValid(): boolean {
  return this.errors.length === 0;
}

// 3. 포맷팅
get formattedDate(): string {
  return this.date.toLocaleDateString('ko-KR');
}

// 4. Signal 래핑
get count(): number {
  return this.countSignal();
}

// 5. 캐싱
get expensiveValue(): number {
  return this._cache ??= this.calculate();
}
```

### 일반 메서드를 써야 할 때 ✅

```typescript
// 1. 파라미터가 필요
formatDate(format: string): string {
  return this.date.format(format);
}

// 2. 비동기
async fetchData(): Promise<Data> {
  return await this.http.get('/api');
}

// 3. 부작용(side effect)이 있음
sendEmail(): void {
  this.emailService.send();
}

// 4. 실행 비용이 명확해야 함
calculateComplexValue(): number {
  // 무거운 계산...
}
```

## 요약

| 특징         | Getter            | 일반 메서드            |
| ------------ | ----------------- | ---------------------- |
| **호출**     | `obj.value`       | `obj.getValue()`       |
| **느낌**     | 속성              | 동작                   |
| **파라미터** | ❌ 불가           | ✅ 가능                |
| **비동기**   | ❌ 불가           | ✅ 가능                |
| **템플릿**   | `{{ obj.value }}` | `{{ obj.getValue() }}` |
| **목적**     | 데이터 접근       | 로직 실행              |

**핵심**: JavaScript/TypeScript의 getter는 **"계산되지만 속성처럼 보이게"** 하는 게 주 목적! C#처럼 캡슐화가 주 목적이 아님
