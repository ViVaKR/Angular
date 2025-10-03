import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter implements OnInit {

  @Input()
  initialCount = 0;

  count = 0;

  message: string = '안녕하세요, 자식 컴포넌트입니다.';

  ngOnInit(): void {
    this.count = this.initialCount;
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  // 부모가 호출할 수 있는 공개 메서드
  resetCount(newValue: number = 0) {
    this.count = newValue;
  }

}
