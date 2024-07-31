import { Directive, HostListener, ElementRef, OnInit, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appTextareaAutoresize]',
  standalone: true
})
export class TextareaAutoresizeDirective implements AfterContentInit {

  constructor(private elementRef: ElementRef) { }

  @HostListener(':input') onInput() {
    this.resize();
  }
  ngAfterContentInit(): void {
    if (this.elementRef.nativeElement.scrollHeight > 0) {
      setTimeout(() => this.resize(), 0);
    }
  }

  resize() {
    this.elementRef.nativeElement.style.height = "0";
    this.elementRef.nativeElement.style.height = (this.elementRef.nativeElement.scrollHeight) + "px";
  }
}
