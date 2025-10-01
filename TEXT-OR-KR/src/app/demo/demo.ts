import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-demo',
  imports: [

    AsyncPipe
  ],
  templateUrl: './demo.html',
  styleUrl: './demo.scss',
})
export class Demo {

  data$: Observable<string> = of("Hello, World")

  constructor() {
  }
}
