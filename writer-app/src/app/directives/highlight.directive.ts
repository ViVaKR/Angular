import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('skyblue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('yellow');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}


/*

--> Events in Angular
    error
    click
    dbclick
    focus
    blur
    keydown
    keyup
    load
    mousedown
    mouseenter
    mouseleave
    mouseout
    mouseup
    wheel
    scroll
    select
    submit
    touchstart




*/
