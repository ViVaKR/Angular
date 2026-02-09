import { Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from "@angular/router";
import { delay, takeWhile, tap, timer } from 'rxjs';
import { QuotesService } from '@app/core/services/quotes-service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { Paths } from '@app/data/menu-data';

export const favority_1 = [
  { id: 1, name: '제', url: 'demo-1' },
  { id: 2, name: '행', url: 'demo-2' },
  { id: 3, name: '무', url: 'demo-3' },
  { id: 4, name: '상', url: 'deom-4' }
];

export const favority_2 = [
  { id: 1, name: '제', url: 'demo-5' },
  { id: 2, name: '법', url: 'demo-6' },
  { id: 3, name: '무', url: 'demo-7' },
  { id: 4, name: '아', url: 'deom-8' }
];

export const favority_3 = [
  { id: 1, name: '열', url: 'demo-9' },
  { id: 2, name: '반', url: 'demo-10' },
  { id: 3, name: '적', url: 'demo-11' },
  { id: 4, name: '정', url: 'deom-12' }
];

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    RouterLink,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  enterActive = signal(false);
  leaveActive = signal(false);

  private router = inject(Router);
  private quotesService = inject(QuotesService);

  private history: number[] = [];
  private historySize = 3;

  favorityLeft = favority_1;
  favorityMiddle = favority_2;
  favorityRight = favority_3;
  toolTips = ["모든 것은 변한다", "고정된 실체는 없다", "고통이 사라진 평안한 상태"];
  getDynamicStyles() {
    return { 'font-size': this.currentIdx() === 3 ? '5rem' : '4rem' };
  }

  isVisible = signal(true);
  currentIndex = signal(0);
  currentIdx = signal(0);

  quotes = this.quotesService.getAllQuotes();
  currentQuote = computed(() => this.quotes[this.currentIndex()]);
  message = signal<Array<{ key: string; char: string; delay: number }> | null>(null);

  readonly messages = [
    "소리에 놀라지 않는 사자처럼",
    "그물에 걸리지 않는 바람처럼",
    "진흙에 더러워지지 않는 연꽃처럼",
    "무소의 뿔처럼 혼자서 가라"
  ];

  constructor() {

    effect(() => {
      if (this.enterActive() === false) {  // 초기 false
        this.enterActive.set(true);
        setTimeout(() => this.enterActive.set(false), 300);
      }
    });

    effect(() => {
      if (this.leaveActive() === false) {
        this.leaveActive.set(true);
        setTimeout(() => this.leaveActive.set(false), 300);
      }
    });

    timer(1000, 5000).pipe(
      takeUntilDestroyed(),
      takeWhile(i => i < this.messages.length)
    ).subscribe(i => {
      this.currentIdx.set(i);
      const text = this.messages[i];
      const result = Array.from(text).map((c, idx) => ({
        key: crypto.randomUUID(),     // 항상 새로운 요소로 재생성
        char: c === ' ' ? '\u00A0' : c,
        delay: idx * 100 + Math.random() * 80 // 부드러운 랜덤성
      }));

      this.message.set(result);
    });

    timer(5_000, 8_000).pipe(
      tap(() => {
        this.isVisible.set(false);
      }),
      delay(2000),
      tap(() => {
        const len = this.quotes.length;
        const idx = this.pickRandomIndex(len);
        this.currentIndex.set(idx);
        this.isVisible.set(true);
      }),
      takeUntilDestroyed()
    ).subscribe();
  }

  private pickRandomIndex(len: number): number {
    let idx = Math.floor(Math.random() * len);

    // 최근 history에 포함되면 다시 뽑는다
    while (this.history.includes(idx)) {
      idx = Math.floor(Math.random() * len);
    }

    // history에 기록
    this.history.push(idx);
    if (this.history.length > this.historySize) {
      this.history.shift(); // 오래된 거 제거
    }
    return idx;
  }

  goTo(uri?: string) {
    this.router.navigate([`${uri ?? Paths.Transcription.url}`]);
  }
}
