import { AfterViewInit, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from '@app/services/logger.service';
import { FormsModule } from '@angular/forms';
import { HightlightDirective } from '@app/attr-directives/hightlight.directive';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HightlightDirective
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit, AfterViewInit {
  setUpper($event: Event) {
    this.currentItem = this.currentItem.toUpperCase();
  }
  @Input() name: string = '';

  items: string[] = ['Television', 'Radio', 'Smartphone', 'Tablet', 'Laptop', 'Desktop', 'Smartwatch', 'Smartglasses'];

  tItems = [
    { id: 1, name: 'Television' },
    { id: 2, name: 'Radio' },
    { id: 3, name: 'Smartphone' },
    { id: 4, name: 'Tablet' },
    { id: 5, name: 'Laptop' },
    { id: 6, name: 'Desktop' },
    { id: 7, name: 'Smartwatch' },
    { id: 8, name: 'Smartglasses' }
  ];

  trackByItems(index: number, item: { id: number, name: string }) {
    return item.id;
  }

  isSpecial: boolean = true;

  classes: Record<string, boolean> = {}; // ngClass
  styles: Record<string, string> = {}; // ngStyle
  currentItem: string = 'Television';



  constructor(private logger: LoggerService) {
    this.logger.log('SignUpComponent constructor');
    this.name = 'SignUpComponent';
    console.log('(1) --> constructor');

    this.classes = {
      'text-3xl': true,
      'font-bold': true,
      'text-slate-200': true,
      'bg-blue-500': true,
      'p-4': true,
      'rounded-lg': true,
      'mx-4': true

    };

    this.styles = {
      'text-align': 'center',
      'margin-top': '20px',
      'color': '#00FFFF',
      'font-size': '24px',
      'font-weight': 'bold'
    };

    // const id = setInterval(() => this.count++, 1000);
    // const destroyRef = inject(DestroyRef);
    // destroyRef.onDestroy(() => clearInterval(id));
  }


  // 바인딩된 입력 프로퍼티 값이 처음 설정되거나 변경될 때 실행되는 라이프사이클 후킹 메서되
  // 이 메서드는 매우 자주 실행되므로 효율적으로 구현해야 합니다
  // 이 메서드는 컴포넌트 인스턴스가 생성된 직후에 실행됩니다
  // 한번만 실행되기 때문에 초기화 로직을 작성하기에 적합합니다.
  ngOnChanges(): void {
    console.log('--> ngOnChanges');
  }

  //? [ 컴포넌트, 디렉티브 초기화 후 실행되는 라이프사이클 후킹 메서드 ]
  // 디렉티브나 컴포넌드에 바인된 입력 프로퍼티 값이 처음 할당된 후에 실행됨
  // ngOnChanges() 가 처음 실행된 훼 합 번 실행됨
  // 컴포넌트의 뷰가 초기화되고 뷰와 자식 뷰들이 초기화된 직후에 실행됩니다.
  // 복잡한 초기화 작업 수행에 적합합니다.
  // 입력 프로퍼티 값을 할당한 후의 최기화 작업
  //! https://www.angular.kr/guide/lifecycle-hooks#oninit
  ngOnInit(): void {
    this.name = 'From ngOnInit()';
    console.log('(2) --> ngOnInit');
  }

  //? [화면 변경사항 감지 후 실행되는 라이프사이클 후킹 메서드]
  // 컴포넌트의 뷰가 초기화된 직후에 실행됩니다.
  //! https://www.angular.kr/guide/lifecycle-hooks#aftercontent
  ngAfterViewInit(): void {
    console.log('(4) --> ngAfterViewInit');
  }

  //? [컴포넌트나 디렉티브 뷰와 자식 뷰를 검사한 후 실행되는 라이프사이클 후킹 메서되]
  // ngAfterViewInit() 가 실행된 직후에 실행됩니다.
  //! https://www.angular.kr/guide/lifecycle-hooks#aftercontent
  ngAfterViewChecked(): void {
    console.log('(5) --> ngAfterViewChecked');
  }

  //? [ 변화 감지 사이클 후 실행되는 라이프사이클 후킹 메서드]
  // ngOnInit() 메서드가 실행된 직후에 한번 실행되며
  // 변화 감지 싸이클이 실행되면서, ngOnChagnes() 가 실행된 이후에 매번 실행됩니다.
  //! https://www.angular.kr/guide/lifecycle-hooks#docheck
  ngDoCheck(): void {
    console.log('(3) --> ngDoCheck');
  }

  //--> [ 컴포넌트가 제거되기 전에 실행되는 라이프사이클 후킹 메서드]
  // Angular 가 디렉티브나 컴포넌드 인스턴스를 종료하기 전에 실행됩니다.
  // 옵저러블을 구독 해지한거나 이벤트 핸들러를 제거하는 등
  // 메모리 누수를 방지하는 로직을 작성하는 용도로 사용.
  // 1. 옵저러블이나 DOM 이벤트 구독 해지
  // 2. 인터벌 타이머 중단
  // 3. 디렉티브가 전역이나 애플리케이션 서비스에 드록한 콜백 정리
  //! https://www.angular.kr/guide/lifecycle-hooks#ondestroy
  ngOnDestroy(): void {
    console.log('(5) --> ngOnDestroy');
  }

}


/*
! 디렉티브
--> 디렉티브는 HTML 엘리먼트의 동작이나 모양을 변경하는 역할을 합니다.
--> 폼, 목록, 스타일 등에 적용할 수 있는 디렉티브가 있습니다.

1. 컴포넌트 : 템플릿이 존재하는 디렉티브.
2. 어트리뷰트 디렉티브 : 엘리먼트, 컴포넌트, 디렉티브의 모습이나 동작을 변경하는 디렉티브 DOM 엘리먼트의 어트리뷰트 값을 변경하는 디렉티브.
  NgClass : CSS 클래스를 추가하거나 제거하는 디렉티브.
    import { Component } from '@angular/core';

  NgStyle : CSS 스타일을 추가하거나 제거하는 디렉티브.
  NgModel : HTML 폼 엘리먼트에 양방향 데이터 바인딩을 연결하는 등의 폼 컨트롤의 값을 바인딩하는 디렉티브.

3. 구조 디렉티브 : 조건에 따라 DOM 엘리먼트를 추가하거나 제거하는 디렉티브.

    *ngIf, *ngFor, *ngSwitch, *ngSwitchCase, *ngSwitchDefault, *ngPlural, *ngTemplateOutlet, *ngComponentOutlet, *ngTemplate, *ngContainer, *ngProjectAs



*/
