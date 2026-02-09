import { Directive, ElementRef, input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDynamicTruncate]',
})
export class DynamicTruncate implements OnInit, OnDestroy {

  text = input<string>('');
  charWidth = input<number>(8);

  private resizeObserver?: ResizeObserver;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.updateText();
    });

    this.resizeObserver.observe(this.el.nativeElement);
    this.updateText();
  }


  updateText() {
    const width = this.el.nativeElement.offsetWidth;
    const maxChars = Math.floor(width / Number(this.charWidth));

    const truncated = this.text.length > maxChars
      ? this.text().slice(0, maxChars - 3) + '...'
      : this.text;

    this.renderer.setProperty(
      this.el.nativeElement,
      'textContent',
      truncated
    );
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }
}
