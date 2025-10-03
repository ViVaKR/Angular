import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-demo-list',
  imports: [],
  templateUrl: './demo-list.html',
  styleUrl: './demo-list.scss'
})
export class DemoList {

  counterObservable = interval(1000);

  counter = toSignal(this.counterObservable, {
    initialValue: 0
  });

}
