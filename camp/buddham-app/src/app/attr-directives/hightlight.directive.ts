import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHightlight]',
  standalone: true
})
export class HightlightDirective {

  @Input() appHightlight: string = '';

  backgroundColor: string = 'yellow';

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = this.appHightlight;
    this.el.nativeElement.style.color = '#FFFFFF';
  }

}
