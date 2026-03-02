import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from "@angular/router";
import { delay, takeWhile, tap, timer } from 'rxjs';
import { QuotesService } from '@app/core/services/quotes-service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { Paths } from '@app/data/menu-data';
import { IpService } from '@app/core/services/ip-service';
import { IPetal } from '@app/core/interfaces/i-petal';

// 메뉴 데이터를 더 체계적으로 관리
export const FOLDER_CONFIG = [
  {
    tooltip: "모든 것은 변한다",
    class: 'folder-left max-md:left-[13%]',
    items: [
      { id: 1, name: '제', url: '...' },
      { id: 2, name: '행', url: '...' },
      { id: 3, name: '무', url: '...' },
      { id: 4, name: '상', url: '...' }
    ]
  },
  {
    tooltip: "고정된 실체는 없다",
    class: 'folder-middle',
    items: [
      { id: 1, name: '제', url: '...' },
      { id: 2, name: '법', url: '...' },
      { id: 3, name: '무', url: '...' },
      { id: 4, name: '아', url: '...' }
    ]
  },
  // ... 생략 (Right 도 같은 방식)
  {
    tooltip: "모든 번뇌소멸 해탈에 이름",
    class: 'folder-right',
    items: [
      { id: 1, name: '열', url: '...' },
      { id: 2, name: '반', url: '...' },
      { id: 3, name: '적', url: '...' },
      { id: 4, name: '정', url: '...' }
    ]
  }
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

  private readonly ipService = inject(IpService);
  private readonly router = inject(Router);
  private readonly quotesService = inject(QuotesService);

  // 1. 상수 데이터 바인딩
  readonly folders = FOLDER_CONFIG;

  readonly messages = [
    "소리에 놀라지 않는 사자처럼",
    "그물에 걸리지 않는 바람처럼",
    "진흙에 더러워지지 않는 연꽃처럼",
    "무소의 뿔처럼 혼자서 가라"
  ];

  // 2. 상태 관리 (Signals)
  isVisible = signal(true);
  currentIndex = signal(0);
  currentIdx = signal(0);
  petals = signal<IPetal[]>([]);

  message = signal<Array<{ key: string; char: string; delay: number }> | null>(null);

  // 3. Computed 활용 (반응형 로직 최적화)
  quotes = this.quotesService.getAllQuotes();
  currentQuote = computed(() => this.quotes[this.currentIndex()]);
  publicIp = computed(() => this.ipService.getPublicIpAddress.value()?.ip);

  // 값만 리턴하는 시그널
  fontSize = computed(() => this.currentIdx() === 3 ? '5rem' : '4rem');

  enterActive = signal(false);
  leaveActive = signal(false);

  private history: number[] = [];
  private historySize = 3;

  constructor() {
    this.initMessageTimer();
    this.initQuoteTimer();
  }

  // 메시지 타이머 (메소드로 분리해서 가독성 업!)
  private initMessageTimer() {
    timer(1000, 5000).pipe(
      takeUntilDestroyed(),
      takeWhile(i => i < this.messages.length),
      tap(i => {
        // 1. 기존 메시지를 비워 DOM을 완전히 제거 (애니메이션 초기화)
        this.message.set(null);

        // 2. 아주 짧은 딜레이 후 새 문장을 구성
        setTimeout(() => {
          this.currentIdx.set(i);
          const text = this.messages[i];
          const result = Array.from(text).map((c, idx) => ({
            // idx를 포함한 유니크 키를 생성하여 Angular가 확실히 새 요소로 인식하게 함
            key: `char-${i}-${idx}-${crypto.randomUUID().slice(0, 8)}`,
            char: c === ' ' ? '\u00A0' : c,
            delay: idx * 100 + Math.random() * 80
          }));
          this.message.set(result);
        }, 50); // 50ms 정도의 여유를 줍니다.
      })
    ).subscribe();
  }

  // 명언 타이머
  // private initQuoteTimer() {
  //   timer(5000, 8000).pipe(
  //     tap(() => this.isVisible.set(false)),
  //     delay(2000),
  //     tap(() => {
  //       this.currentIndex.set(this.pickRandomIndex(this.quotes.length));
  //       this.isVisible.set(true);
  //     }),
  //     takeUntilDestroyed()
  //   ).subscribe();
  // }
  // 법문이 바뀔 때 광채 효과를 주기 위한 추가 시그널
  isQuoteGlowing = signal(false);

  private initQuoteTimer() {
    timer(5000, 8000).pipe(
      tap(() => {
        this.isVisible.set(false);
        this.isQuoteGlowing.set(false); // 광채 끄기
      }),
      delay(2000),
      tap(() => {
        this.currentIndex.set(this.pickRandomIndex(this.quotes.length));
        this.isVisible.set(true);
        this.isQuoteGlowing.set(true); // 새 법문이 나올 때 광채 켜기

        // 1초 뒤에 광채를 서서히 줄임
        setTimeout(() => this.isQuoteGlowing.set(false), 1000);
      }),
      takeUntilDestroyed()
    ).subscribe();
  }

  private pickRandomIndex(len: number): number {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * len);
    } while (this.history.includes(idx));

    this.history = [...this.history.slice(-(this.historySize - 1)), idx];
    return idx;
  }
  // 마우스 이동 이벤트 핸들러
  onMouseMove(event: MouseEvent) {
    // 너무 많이 생성되지 않도록 확률적으로 생성 (30% 확률)
    if (Math.random() > 0.3) return;

    const newPetal: IPetal = {
      id: crypto.randomUUID(),
      x: event.clientX,
      y: event.clientY,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.8,
      delay: Math.random() * 200
    };

    // 새 잎 추가
    this.petals.update(p => [...p, newPetal]);

    // 2초 뒤에 제거 (애니메이션 종료 후)
    setTimeout(() => {
      this.petals.update(p => p.filter(item => item.id !== newPetal.id));
    }, 2000);
  }
  goTo(uri?: string) {
    this.router.navigate([`${uri ?? Paths.Transcription.url}`]);
  }
}
