// ══════════════════════════════════════════════════════
// breadcrumb.service.ts
// ══════════════════════════════════════════════════════
import { Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

export interface IBreadcrumb {
  label: string;   // 표시 텍스트
  url: string;   // 클릭시 이동할 경로
  icon?: string;   // mat-icon (선택)
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  // 🔥 Signal 기반 breadcrumb 목록
  private readonly _crumbs = signal<IBreadcrumb[]>([]);
  readonly crumbs = this._crumbs.asReadonly();

  // 홈은 항상 첫 번째
  private readonly HOME: IBreadcrumb = {
    label: '홈',
    url: '/Home',
    icon: 'home',
  };

  constructor() {
    // 🔥 라우팅 변경시마다 자동 갱신
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe(() => {
      this._crumbs.set(this.buildCrumbs(this.activatedRoute.root));
    });
  }

  // ── 🔥 핵심: ActivatedRoute 트리를 재귀로 순회 ──────
  private buildCrumbs(
    route: ActivatedRoute,
    url = '',
    crumbs: IBreadcrumb[] = [this.HOME],
  ): IBreadcrumb[] {

    for (const child of route.children) {
      const segment = child.snapshot.url
        .map(s => s.path)
        .join('/');

      // url 누적
      const fullUrl = segment ? `${url}/${segment}` : url;

      // data.breadcrumb 있는 경우만 추가
      const data = child.snapshot.data;

      if (data['breadcrumb']) {
        // 중복 방지 (홈과 같은 경로면 스킵)
        const isDuplicate = crumbs.some(c => c.url === fullUrl);

        if (!isDuplicate) {
          crumbs.push({
            label: data['breadcrumb'],
            url: fullUrl,
            icon: data['breadcrumbIcon'] ?? undefined,
          });
        }
      }

      // 자식 라우트 재귀 탐색
      this.buildCrumbs(child, fullUrl, crumbs);
    }

    return crumbs;
  }
}
