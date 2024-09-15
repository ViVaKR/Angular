import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scroll-arrow',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './scroll-arrow.component.html',
  styleUrl: './scroll-arrow.component.scss'
})
export class ScrollArrowComponent {

  @Input() isVisible: boolean = false;
  @Output() saveData = new EventEmitter();

  scroll(top: number = document.body.scrollHeight) {
    window.scrollTo({ top, behavior: 'smooth' });
  }

  save() {
    this.saveData.emit();
  }
}
