import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { interval } from 'rxjs';

@Component({
  selector: 'app-demo-list',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './demo-list.html',
  styleUrl: './demo-list.scss'
})
export class DemoList {

  counterObservable = interval(1000);

  counter = toSignal(this.counterObservable, {
    initialValue: 0
  });

}
