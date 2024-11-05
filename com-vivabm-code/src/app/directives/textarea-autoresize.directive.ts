import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextareaAutoresize]',
  standalone: true
})
export class TextareaAutoresizeDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  @HostListener(':input') onInput() {
    this.adjust();
  }

  ngAfterViewInit() {
    if (this.elementRef.nativeElement.scrollHeight > 0) {
      setTimeout(() => this.adjust(), 0);
    }
  }

  adjust() {
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 'px';
  }
}
