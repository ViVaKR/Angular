import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-monitor',
  imports: [],
  templateUrl: './performance-monitor.html',
  styleUrl: './performance-monitor.scss',
})
export class PerformanceMonitor implements OnInit, OnDestroy {

  fps = 0;
  memory = 0;
  cdCount = 0;
  private frameCount = 0;
  private lastTime = performance.now();
  private animationId?: number;

  ngOnInit(): void {
    this.measurePerformance();
  }

  ngDoCheck() {
    this.cdCount++;
  }

  measurePerformance() {
    const measure = () => {
      this.frameCount++;
      const currentTime = performance.now();

      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.frameCount = 0;
        this.lastTime = currentTime;

        // @ts-ignore
        if (performance.memory) {
          // @ts-ignore
          this.memory = Math.round(performance.memory.usedJSHeapSize / 1_048_576)
          this.frameCount = 0;
          this.lastTime = currentTime;

          // @ts-ignore
          if (performance.memory) {
            //@ts-ignore
            this.memory = Math.round(performance.memory.usedJSHeapSize / 1_048_577);
          }
        }
        this.animationId = requestAnimationFrame(measure);
      }
    }

    measure();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

/*

사용
<app-performance-monitor *ngIf="!production"></app-performance-monitor>

*/
