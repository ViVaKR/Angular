아하! 내 친구! 뽀빠이가 다시 왔다네! 💪 상세한 사용 예시와 `output()` 함수, 그리고 `input('')`과 `signal('')`의 차이점에 대한 구체적인 설명이 필요하구나! 아주 중요한 질문일세, 뽀빠이가 명확하게 짚어주겠네! ✨🤔✨💪🏻🏋️‍♂️

---

### **1. 자식 컴포넌트에서 부모 컴포넌트로 값 전달: `@Output` vs. `output()`**

자네의 기억대로, 이전에는 `@Output()` 데코레이터와 `EventEmitter`를 사용했지. 새로운 `output()` 함수 방식에서도 기본적인 메커니즘은 동일하다네: **자식은 이벤트를 발생시키고, 부모는 그 이벤트를 구독하여 처리한다.** 다만 선언 방식이 더 간결해졌을 뿐이지!

**시나리오:** 자식 컴포넌트 (`ChildComponent`)에서 버튼을 클릭하면, 부모 컴포넌트 (`ParentComponent`)로 어떤 메시지를 전달하는 예시.

#### **`ChildComponent` (자식 컴포넌트): 이벤트 발생 (`output()` 사용)**

```typescript
// src/app/child/child.component.ts
import { Component, output } from '@angular/core'; // output 함수 임포트!

@Component({
  selector: 'app-child',
  standalone: true, // 스탠드얼론 컴포넌트
  template: `
    <div style="border: 1px solid blue; padding: 10px; margin-top: 10px;">
      <h4>자식 컴포넌트</h4>
      <button (click)="sendMessage()">부모에게 메시지 보내기</button>
      <button (click)="sendNumber()">부모에게 숫자 보내기</button>
    </div>
  `,
})
export class ChildComponent {
  // ⭐️ 1. output() 함수로 이벤트 이미터 선언
  //    emit() 메서드를 가질 OutputEmitterRef 타입을 반환
  messageEvent = output<string>(); // 문자열을 보낼 이벤트
  numberEvent = output<number>(); // 숫자를 보낼 이벤트

  // ⭐️ 2. 자식 컴포넌트 내부에서 이벤트 발생 (.emit() 호출)
  sendMessage(): void {
    const data = `자식에서 보낸 메시지: ${new Date().toLocaleTimeString()}`;
    console.log(`[Child] Emitting message: ${data}`);
    this.messageEvent.emit(data); // 이벤트 발생!
  }

  sendNumber(): void {
    const num = Math.floor(Math.random() * 100);
    console.log(`[Child] Emitting number: ${num}`);
    this.numberEvent.emit(num); // 이벤트 발생!
  }
}
```

#### **`ParentComponent` (부모 컴포넌트): 이벤트 구독 (`@` 이벤트 바인딩 사용)**

```typescript
// src/app/parent/parent.component.ts
import { Component, signal } from '@angular/core';
import { ChildComponent } from '../child/child.component'; // 자식 컴포넌트 임포트

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent], // 자식 컴포넌트를 imports 배열에 추가
  template: `
    <div style="border: 1px solid green; padding: 10px;">
      <h3>부모 컴포넌트</h3>
      <p>자식 메시지: {{ receivedMessage() }}</p>
      <p>자식 숫자: {{ receivedNumber() }}</p>

      <!-- ⭐️ 3. 부모 템플릿에서 이벤트 구독 (@eventName="handler($event)") -->
      <app-child
        (messageEvent)="handleChildMessage($event)"
        (numberEvent)="handleChildNumber($event)"
      ></app-child>
    </div>
  `,
})
export class ParentComponent {
  receivedMessage = signal<string>('아직 메시지 없음');
  receivedNumber = signal<number | null>(null);

  // ⭐️ 4. 자식 이벤트 핸들러 메서드
  handleChildMessage(message: string): void {
    console.log(`[Parent] Received message from child: ${message}`);
    this.receivedMessage.set(message); // 시그널 업데이트
  }

  handleChildNumber(num: number): void {
    console.log(`[Parent] Received number from child: ${num}`);
    this.receivedNumber.set(num); // 시그널 업데이트
  }
}
```

**결론:** `output()` 함수를 사용하더라도, 자식-부모 간 이벤트 통신 방식의 개념과 템플릿 문법 (`(eventName)="handler($event)"`)은 기존 `@Output` 방식과 완전히 동일하다네. 다만 자식 컴포넌트 내부에서 `EventEmitter` 인스턴스를 직접 생성하던 과정을 `output()` 함수 호출로 대체하여 **선언이 더 간결**해진 것이지!

---

### **2. `input('')` vs. `signal('')`: 언제 무엇을 사용하는가?**

이 둘은 시그널처럼 보이지만, **목적과 사용 시점이 완전히 다르다네.** 이것을 정확히 이해하는 것이 매우 중요하지!

#### **`signal('')` (읽고 쓸 수 있는 시그널)**

- **목적:** 컴포넌트나 서비스 내부에서 **변경 가능한(Mutable) 상태를 정의**하고 관리하기 위해 사용한다네. 이 시그널은 자신의 값을 **`set()` 메서드**를 통해 변경할 수 있다네.
- **특징:**
  - **내부 상태:** 컴포넌트/서비스 내부의 `private` 또는 `public` 상태 변수로 사용.
  - **쓰기 가능:** `mySignal.set(newValue)`로 값을 변경할 수 있다네.
  - **초기값 필수:** `signal('초기값')`처럼 초기값을 반드시 제공해야 한다네.
- **사용 예시:**

  ```typescript
  import { Component, signal } from '@angular/core';

  @Component({
    /* ... */
  })
  export class MyComponent {
    // ⭐️ 컴포넌트 내부에서 변경될 수 있는 사용자 이름 상태
    username = signal('Guest'); // 초기값 'Guest'

    changeUsername(newName: string): void {
      this.username.set(newName); // 내부에서 값을 변경
    }

    // 읽을 때: this.username()
    // 템플릿에서: {{ username() }}
  }
  ```

#### **`input('')` (부모로부터 값을 받는 '읽기 전용' 시그널)**

- **목적:** **부모 컴포넌트로부터 데이터를 전달받기 위해** 사용한다네. `input()`으로 선언된 속성은 부모 컴포넌트가 `[propName]="parentData"`와 같은 Input 바인딩을 통해 값을 제공한다네.
- **특징:**
  - **외부 주입:** 부모 컴포넌트로부터 값을 받는다네.
  - **읽기 전용:** `input()`으로 선언된 속성(`this.data()`)은 **읽기 전용 시그널**이라네. 자식 컴포넌트 내부에서 `data.set(newValue)`처럼 값을 직접 변경할 수 없다네! 부모가 값을 변경해야만 업데이트된다네.
  - **초기값/필수:** `input('초기값')`으로 기본값을 지정하거나, `input.required<T>()`로 필수로 선언할 수 있다네.
- **사용 예시:**

  ```typescript
  import { Component, input } from '@angular/core';

  @Component({
    /* ... */
  })
  export class ChildComponent {
    // ⭐️ 부모로부터 'userName'이라는 Input을 받기 위한 선언
    //    내부에서는 읽기 전용 시그널로 동작
    userName = input<string>('Guest'); // 부모가 값을 주지 않으면 'Guest'가 기본값

    // 이 userName 시그널은 this.userName.set()으로 변경할 수 없다!
    // 부모 컴포넌트에서 <app-child [userName]="'Alice'"></app-child> 와 같이 값을 변경해야만
    // 자식의 userName() 값이 업데이트된다.
  }

  // 부모 컴포넌트에서:
  // <app-child [userName]="parentUserNameSignal()"></app-child>
  ```

#### **구체적인 사용 시나리오 예시:**

`UserDetail` 컴포넌트가 있다고 가정해 보자.

```typescript
// src/app/user-detail/user-detail.component.ts
import { Component, input, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  template: `
    <div style="border: 1px solid purple; padding: 10px;">
      <h3>사용자 상세 정보</h3>
      <p>ID: {{ userId() }}</p>
      <p>이름: {{ localUserName() }}</p>
      <p>나이: {{ age() }}</p>
      <button (click)="incrementAge()">나이 증가 (내부 상태)</button>
    </div>
  `,
})
export class UserDetailComponent implements OnInit {
  // ⭐️ 1. 부모로부터 'userId'라는 Input을 받는다. (읽기 전용)
  //    이것은 UserDetail 컴포넌트의 "외부로부터 주입되는" 식별자이다.
  userId = input.required<string>();

  // ⭐️ 2. 부모로부터 'initialUserName'을 받아서, 컴포넌트 내부의 'localUserName' 시그널의 초기값으로 사용한다.
  //    이 'localUserName'은 컴포넌트 내부에서 변경될 수 있는 "내부 상태"이다.
  initialUserName = input<string>('미지정');
  localUserName = signal<string>(''); // 실제 컴포넌트 내부에서 변경 가능한 이름 시그널

  // ⭐️ 3. 'age'는 순수하게 컴포넌트 내부에서만 관리되는 상태이다.
  age = signal<number>(0);

  ngOnInit(): void {
    // initialUserName Input 값을 사용하여 localUserName 시그널 초기화
    this.localUserName.set(this.initialUserName());
  }

  incrementAge(): void {
    this.age.update((currentAge) => currentAge + 1); // 내부 상태 변경
  }
}
```

```typescript
// src/app/app.component.ts (Parent 역할을 하는 컴포넌트)
import { Component, signal } from '@angular/core';
import { UserDetailComponent } from './user-detail/user-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserDetailComponent],
  template: `
    <h1>메인 앱</h1>
    <button (click)="changeUserId()">유저 ID 변경 (부모 상태)</button>
    <button (click)="changeInitialUserName()">초기 유저 이름 변경 (부모 상태)</button>

    <!-- ⭐️ UserDetailComponent에 Input 바인딩 -->
    <app-user-detail [userId]="currentUserId()" <!-- userId는 input.required 이므로 반드시 제공 -->
      [initialUserName]="parentUserName()"
      <!-- initialUserName은 input으로 제공, localUserName의 초기값 됨 -->
      ></app-user-detail
    >
  `,
})
export class AppComponent {
  currentUserId = signal('user-123');
  parentUserName = signal('김철수');

  changeUserId(): void {
    const newId = `user-${Math.floor(Math.random() * 1000)}`;
    this.currentUserId.set(newId);
  }

  changeInitialUserName(): void {
    const newName = Math.random() > 0.5 ? '이영희' : '박수철';
    this.parentUserName.set(newName);
  }
}
```

**결론:**

- **`signal('')`**: 컴포넌트/서비스 **내부의 변경 가능한 상태**를 관리할 때 사용. `set()`으로 값을 바꿀 수 있음.
- **`input('')`**: 부모 컴포넌트로부터 **데이터를 전달받는 용도**로 사용. 자식 컴포넌트 내부에서 `input()` 시그널의 값을 직접 `set()`할 수 없음. 부모가 변경해야 업데이트됨.

이 두 가지는 시그널이라는 공통점이 있지만, **데이터의 "흐름(flow)"과 "책임(responsibility)"**이라는 관점에서 명확히 구분된다네. `input()`은 데이터를 "받는" 통로, `signal()`은 "내부에서 관리하는" 저장소로 생각하면 이해하기 쉬울 걸세!

이제 `output()`, `input()`, `signal()`의 차이점과 사용법이 명확해졌으리라 믿네, 내 친구! 뽀빠이와 함께라면 Angular의 어떤 최신 기능도 두렵지 않을 걸세! 💪
