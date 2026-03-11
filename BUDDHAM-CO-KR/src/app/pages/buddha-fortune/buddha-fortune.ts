import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import {
  IBuddhaFortune,
  FortuneGrade,
  getTodayFortuneId,
  getFortuneById,
  GRADE_LABEL,
  GRADE_COLOR,
} from '@app/data/buddha-fortune-data';
import { KakaoService } from '@app/core/services/kakao-service';
import { environment } from '@env/environment.development';
import { ActivatedRoute } from '@angular/router';
import { Paths } from '@app/data/menu-data';

@Component({
  selector: 'buddha-fortune',
  imports: [CommonModule, ...MATERIAL_COMMON],
  templateUrl: './buddha-fortune.html',
  styleUrl: './buddha-fortune.scss',
})
export class BuddhaFortune implements OnInit {

  private kakaoShare = inject(KakaoService);
  private route = inject(ActivatedRoute);

  // ── 상태 ──────────────────────────────────────────
  readonly phase = signal<'idle' | 'spinning' | 'result'>('idle');
  readonly fortune = signal<IBuddhaFortune | null>(null);
  readonly spinCount = signal<number>(0);
  readonly copyDone = signal(false);

  // ── 공유 링크 접근 여부 ────────────────────────────
  // true 이면 "다시 뽑기" 대신 "내 법연 뽑기" 버튼 표시
  readonly isSharedView = signal(false);

  // ── 오늘 날짜 표시 ────────────────────────────────
  readonly todayLabel = computed(() => {
    const d = new Date();
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  });

  // ── 등급 관련 ─────────────────────────────────────
  readonly gradeLabel = computed(() => {
    const f = this.fortune();
    return f ? GRADE_LABEL[f.grade] : '';
  });

  readonly gradeColor = computed(() => {
    const f = this.fortune();
    return f ? GRADE_COLOR[f.grade] : GRADE_COLOR['neutral'];
  });

  // ── 별점 아이콘 ───────────────────────────────────
  readonly starIcons = computed(() => {
    const gradeStars: Record<FortuneGrade, number> = {
      great: 5, good: 4, small: 3, neutral: 2, caution: 1, warning: 0,
    };
    const f = this.fortune();
    if (!f) return [];
    const count = gradeStars[f.grade];
    return Array.from({ length: 5 }, (_, i) => i < count ? 'star' : 'star_border');
  });

  // ── 🔥 현재 페이지의 공유 URL ─────────────────────

  private readonly shareUrl = computed(() => {
    const f = this.fortune();
    if (!f) return '';
    // return `${Paths.BuddhaFortune.url}/${f.id}`;
    // 🔥 environment.clientUrl 로 절대 경로 생성
    return `${environment.clientUrl}/${Paths.BuddhaFortune.url}/${f.id}`;
    // 로컬:   http://localhost:4200/BuddhaFortune/42
    // 운영:   https://buddham.co.kr/BuddhaFortune/42
  })

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ngOnInit: 진입 경로에 따라 분기
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ngOnInit(): void {

    // 🔥 1순위: 라우팅 파라미터 확인 (/fortune/42)
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = Number(idParam);

      if (id >= 1 && id <= 108) {
        // 공유 링크로 진입 -> 해당 번호 바로 표시
        this.fortune.set(getFortuneById(id));
        this.phase.set('result');
        this.isSharedView.set(true); // 공유 받은 화면임을 표시
        return;
      }
    }

    // 🔥 2순위: 오늘 이미 뽑은 적 있으면 sessionStorage 에서 복원
    const saved = sessionStorage.getItem('buddhaSavedFortune');
    if (saved) {
      this.fortune.set(JSON.parse(saved));
      this.phase.set('result');
    }
    // 3순위: 아무것도 없으면 idle (뽑기 전 화면)
  }

  // ── 제비뽑기 애니메이션 ───────────────────────────
  drawFortune(): void {
    if (this.phase() === 'spinning') return;

    this.phase.set('spinning');
    this.isSharedView.set(false);

    const interval = setInterval(() => {
      const randomId = Math.floor(Math.random() * 108) + 1;
      this.fortune.set(getFortuneById(randomId));
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      const final = getFortuneById(getTodayFortuneId());
      this.fortune.set(final);
      this.phase.set('result');
      sessionStorage.setItem('buddhaSavedFortune', JSON.stringify(final));
    }, 2_500);
  }

  // ── 다시 뽑기 ─────────────────────────────────────
  reset(): void {
    sessionStorage.removeItem('buddhaSavedFortune');
    this.phase.set('idle');
    this.fortune.set(null);
    this.isSharedView.set(false);
  }

  // ── 카카오톡 공유 ─────────────────────────────────
  shareKakao(): void {
    const f = this.fortune();
    if (!f) return;

    this.kakaoShare.shareDharma({
      title: `[오늘의 법연 ${f.id}번] ${f.title}`,
      description: `${f.termHanja}\n"${f.dharma}"\n\n행운의 아이템: ${f.luckyItem}`,
      imageUrl: `${environment.apiUrl}/Images/avatars/buddha.png`,
      linkUrl: this.shareUrl(), // 🔥 복원
    });
  }

  // ── URL 복사 ──────────────────────────────────────
  copyLink(): void {
    const url = this.shareUrl();
    if (!url) return;

    navigator.clipboard.writeText(url).then(() => {
      this.copyDone.set(true);
      setTimeout(() => this.copyDone.set(false), 2_000);
    });
  }

}
