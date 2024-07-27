import { Component, HostListener } from '@angular/core';
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
  currentPosition: number = 0;
  isHideArrow: boolean = true;

  @HostListener('window:scroll', ['$event.target'])
  onScrollEvent(event: any) {
    let scroll = event.scrollingElement.scrollTop;
    this.currentPosition = scroll;
  }

  scroll(top: number = document.body.scrollHeight, duration: number = 1000, direction: number = 1) {
    let e = document.documentElement;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
