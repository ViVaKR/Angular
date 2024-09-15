import { Component, inject, signal } from '@angular/core';
import { BibleService } from '@app/services/bible.service';

@Component({
  selector: 'app-demo-signals',
  standalone: true,
  imports: [],
  templateUrl: './demo-signals.component.html',
  styleUrl: './demo-signals.component.scss'
})
export class DemoSignalsComponent {

  bibleService = inject(BibleService);

  count = signal<number>(0);

  constructor() {
    this.bibleService.isElement.next(true);
  }

  demo() {
    this.count.set(this.count() + 1);
    this.count.update(x => x + 1);
    console.log('count:', this.count());
  }
}
