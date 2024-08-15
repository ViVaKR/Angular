import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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

  @Output() saveSutra = new EventEmitter();
  currentPosition: number = 0;

  isHideArrow: boolean = true;
  @Input() isVisible: boolean = false;

  @HostListener('window:scroll', ['$event.target'])
  onScrollEvent(event: any) {
    let scroll = event.scrollingElement.scrollTop;
    this.currentPosition = scroll;
  }

  scroll(top: number = document.body.scrollHeight) {
    window.scrollTo({ top, behavior: 'smooth' });
  }

  saveData() {
    console.log('saveData');
    this.saveSutra.emit();
  }
}
