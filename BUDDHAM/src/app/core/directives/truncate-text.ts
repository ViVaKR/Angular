import { AfterViewInit, Directive, effect, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[truncateText]',
})
export class TruncateText implements AfterViewInit {

  limit = input(50);
  suffix = input('...');

  private el = inject(ElementRef<HTMLElement>);
  private originalText = '';

  constructor() {
    effect(() => {
      this.apply();
    })
  }

  ngAfterViewInit(): void {
    this.originalText = this.el.nativeElement.textContent?.trim() ?? '';

    this.apply();
  }

  @HostListener('window:resize')
  onResize() {
    this.apply();
  }

  private apply() {

    if (!this.originalText) return;
    const { limit, suffix } = this;
    return this.el.nativeElement.textContent =
      this.originalText.length > limit()
        ? this.originalText.slice(0, limit()).trimEnd() + suffix()
        : this.originalText;
  }

}
