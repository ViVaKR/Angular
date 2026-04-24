
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
  standalone: true
})
export class AvatarFallback {
  // 사용법: <img [appImageFallback]="'lotus.webp'" [src]="...">
  @Input() appImageFallback?: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('error')
  onError(): void {

    const el = this.el.nativeElement;

    const fallback = this.appImageFallback || 'buddha.png';

    // 1. 이미지 교체
    this.renderer.setAttribute(el, 'src', fallback);

    // 2. 스타일 추가 (예: 로드 실패한 이미지는 살짝 흐리게)
    this.renderer.setStyle(el, 'filter', 'grayscale(100%) opacity(0.8)');

    // 무한 루프 방지 (Fallback 이미지도 없을 경우를 대비)
    this.renderer.setAttribute(el, 'onerror', null!);
  }
}
