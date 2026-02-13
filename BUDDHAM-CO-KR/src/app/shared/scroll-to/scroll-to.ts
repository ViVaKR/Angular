import { CommonModule, DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MATERIAL_COMMON } from '../imports/material-imports';

@Component({
  selector: 'scroll-to',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './scroll-to.html',
  styleUrl: './scroll-to.scss',
})
export class ScrollTo {

  document = inject(DOCUMENT);
  viewportScroller = inject(ViewportScroller);

  // 자동 스크롤 상태 관리
  private autoScrollInterval?: number;
  isAutoScrolling = signal(false);

  // 사용자 설정 가능한 스크롤 속도 (픽셀/초)
  scrollSpeed = signal(50); // 기본값: 초당 50픽셀

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  scrollToTopAngular(): void {
    this.stopAutoScroll(); // 자동 스크롤 중이면 중지
    this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
  }

  scrollToBottomAngular(): void {
    this.stopAutoScroll();
    this.viewportScroller.scrollToPosition([0, this.document.body.scrollHeight], {
      behavior: 'smooth'
    });
  }

  scrollToAnchor(anchorId: string): void {
    this.stopAutoScroll();
    this.viewportScroller.scrollToAnchor(anchorId, {
      behavior: 'smooth'
    });
  }

  // 방법 1: requestAnimationFrame 사용 (가장 부드러움, 추천!)
  scrollForSlowRead(): void {
    if (this.isAutoScrolling()) {
      this.stopAutoScroll();
      return;
    }

    this.isAutoScrolling.set(true);
    let lastTimestamp = 0;

    const scroll = (timestamp: number) => {
      if (!this.isAutoScrolling()) return;

      if (lastTimestamp) {
        const deltaTime = timestamp - lastTimestamp;
        const scrollAmount = (this.scrollSpeed() * deltaTime) / 1000;

        window.scrollBy({
          top: scrollAmount,
          behavior: 'instant' // 'smooth'는 사용하지 않음 (RAF로 직접 제어)
        });

        // 페이지 끝에 도달했는지 확인
        const isBottom =
          window.innerHeight + window.scrollY >= this.document.body.scrollHeight - 10;

        if (isBottom) {
          this.stopAutoScroll();
          return;
        }
      }

      lastTimestamp = timestamp;
      this.autoScrollInterval = requestAnimationFrame(scroll) as unknown as number;
    };

    this.autoScrollInterval = requestAnimationFrame(scroll) as unknown as number;
  }

  // 방법 2: setInterval 사용 (더 간단하지만 덜 부드러움)
  scrollForSlowReadInterval(): void {
    if (this.isAutoScrolling()) {
      this.stopAutoScroll();
      return;
    }

    this.isAutoScrolling.set(true);
    const fps = 60;
    const scrollPerFrame = this.scrollSpeed() / fps;

    this.autoScrollInterval = window.setInterval(() => {
      const isBottom =
        window.innerHeight + window.scrollY >= this.document.body.scrollHeight - 10;

      if (isBottom) {
        this.stopAutoScroll();
        return;
      }

      window.scrollBy({
        top: scrollPerFrame,
        behavior: 'instant'
      });
    }, 1000 / fps);
  }

  stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      if (typeof this.autoScrollInterval === 'number') {
        // requestAnimationFrame 취소
        cancelAnimationFrame(this.autoScrollInterval);
      } else {
        // setInterval 취소
        clearInterval(this.autoScrollInterval);
      }
      this.autoScrollInterval = undefined;
    }
    this.isAutoScrolling.set(false);
  }

  // 속도 조절 메서드
  adjustSpeed(speed: number): void {
    this.scrollSpeed.set(speed);
    // 스크롤 중이면 재시작
    if (this.isAutoScrolling()) {
      this.stopAutoScroll();
      setTimeout(() => this.scrollForSlowRead(), 100);
    }
  }

  // 속도 프리셋
  setSpeedPreset(preset: 'slow' | 'medium' | 'fast'): void {
    const speeds = {
      slow: 30,
      medium: 50,
      fast: 80
    };
    this.adjustSpeed(speeds[preset]);
  }
}
