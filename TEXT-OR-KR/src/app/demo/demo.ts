import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, filter, map, Observable, of } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-demo',
  imports: [
    AsyncPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule

  ],
  templateUrl: './demo.html',
  styleUrl: './demo.scss',
})
export class Demo {

  id = signal('');

  isShown = signal(false);

  enterClass = signal('enter-animation');

  farewell = signal('leaving');

  private activatedRoute = inject(ActivatedRoute);

  data$: Observable<string> = of("Hello, World")

  constructor() {

    this.activatedRoute.params.pipe(
      filter((params: Params) => params['id'] !== undefined && params['id'] !== null),
      map((params: Params) => params['id'] as string),
      catchError(error => of(null))
    ).subscribe({
      next: (id: string | null) => {
        if (id !== null) {
          this.id.set(id);
        } else {
          this.id.set('ID 없음');
        }
      },
      error: err => this.id.set('에러 발생')
      // complete: () => console.log('params 스트림 완료') // 라우터 params 는 보통 완료 되지 않음.
    })
  }

  toggle() {
    this.isShown.update(x => !x);
  }

  updateField(event: KeyboardEvent): void {
    console.log(`The user pressed: ${event.key}`);
  }
}


/*

--> activedRoute.params.pipe(filter(...), map(...)).subscribe(...) 로직

! C# LINQ 와 RxJS 연산자 비교

await (C#) vs. Observable.subscribe() 또는 async 파이프 (RxJS/Angular)
C# await: Task가 완료될 때까지 기다렸다가 그 결과를 얻는 **"풀(Pull) 방식"**이라네. 값을 요청하고 기다리는 개념이지.
RxJS subscribe() / async 파이프: Observable 스트림에서 **"푸시(Push) 방식"**으로 값이 방출될 때마다 콜백 함수를 실행하는 것이라네. 값이 준비될 때마다 알아서 날아오는 개념이지.
비교: 둘 다 비동기 작업의 결과를 최종적으로 '소비'하는 단계라는 점에서 유사하다네. 자네의 C# await는 하나의 완료된 Task를 기다리지만, RxJS의 subscribe는 하나 또는 여러 개의 값을 지속적으로 받아들일 수 있다는 차이가 있음.

EventStream.Observe<Params>().Where(...).Select(...).Subscribe(...) 와 유사.

Observable 은 C# 의 IEnumerable<T> (LINQ) 와 비슷하지만, 비동기적이고 시간의 흐름에 따라 여러 값을 방출한다는차이가 있음.

C# LINQ 와 비교
1. Params 객체 스트림을 Where(filter) 로 걸러내고
2. 각 Params 객체에서 Select(map) 로 id 만 추출할 다음
3. (구독을 통해) 그 id 값을 사용하는 것.



Select vs map

- map : '변환하다.' (어떤 값을 다른 값으로 매핑/변환)
- filter: '걸러내다' (조건에 따라 값을 걸러냄)
- tap: '엿보다' (스트림을 건드리지 않고 중간에 값을 확인)
- switchMap: '전환하다' (새로운 Observable 로 스트림을 전환)


! pipe (RxJS) vs. 메서드 체이닝 (C# LINQ) !

- pipe 역할
Observable 을 생성한 후, RxJS 연산자(filter, map, switchMap, tap, catchError 등 )를 순차적으로 적용하여
Observable 스트림을 변환하고 가공하는 역할을 한다네.

someObservable.pipe(
  filter(item => item.id > 0),  // 1단계: id 가 0보다 큰 아이템만 통과
  map(item => item.name),
  take(5)
).subscribe(resutl => console.log(result));


Observable vs. IEnumerable/IQueryable

pipe 는 닷넷의 메서드 체이닝 구조 자체와 유사함. 둘다 원본 데이터를 변경하지 않고 새로운 형태로 변환해 나가는
함수형 프로그래밍 스타일을 따르고
여러 연산을 순차적으로 연결하는 방식을 사용함.

핵심차이는 pipe 는 시간의 흐름에 따라 비동기적으로 방생하는 데이터 스트림(Observable) 을 다루는 반면,
LINQ 는 주로 이미 존재하는 컬렉션(IEnumerable) 이나 데이터베이스 쿼리(IQueryable) 을 다룸
*/
