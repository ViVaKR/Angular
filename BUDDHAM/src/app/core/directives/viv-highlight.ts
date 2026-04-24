import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[vivHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class VivHighlight {

  vivHighlight = input('');

  private el = inject(ElementRef);

  onMouseEnter() {
    this.highlight(this.vivHighlight());
  }

  onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
