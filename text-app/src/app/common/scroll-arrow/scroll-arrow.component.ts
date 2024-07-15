import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scroll-arrow',
  standalone: true,
  imports: [
    MatIconModule,
    NgIf,
    NgFor
  ],
  templateUrl: './scroll-arrow.component.html',
  styleUrl: './scroll-arrow.component.scss'
})
export class ScrollArrowComponent {

  showTopButton: boolean = false;
  showBottomButton: boolean = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showTopButton = window.scrollY > 350;
    this.showBottomButton = ((window.document.body.scrollHeight - window.innerHeight) - window.scrollY) > 350 && this.showTopButton;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom() {
    window.scrollTo(0, (window.document.body.scrollHeight - window.innerHeight));
  }
}


