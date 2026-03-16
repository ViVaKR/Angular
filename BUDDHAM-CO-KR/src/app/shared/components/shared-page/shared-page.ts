import { Component, computed, inject, input, model, OnInit, signal, viewChild } from '@angular/core';
import { RouterLinkWithHref, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UiService } from '@app/core/services/ui-service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { IMenuConfig, IMenuGroup } from '@app/core/interfaces/i-menu-config';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'shared-page',
  imports: [
    RouterLinkWithHref,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    MATERIAL_COMMON
  ],
  templateUrl: './shared-page.html',
  styleUrl: './shared-page.scss'
})
export class SharedPage implements OnInit {

  title = input<string>('메뉴');

  // 🔥 단일 그룹 (기존 하위 호환 - menus 만 있는 경우)
  menus = input<IMenuConfig[] | null>(null);
  menuGroups = model<IMenuGroup[] | null>(null);
  home = input<string>('');

  accordion = viewChild.required(MatAccordion);

  // 🔥 열린 패널 인덱스 Set 으로 관리
  readonly openedPanels = signal<Set<number>>(new Set());

  // ── 🔥 computed: 단일/다중 통합 처리 ────────────────
  readonly resolvedGroups = computed<IMenuGroup[]>(() => {
    const groups = this.menuGroups();
    if (groups && groups.length > 0) return groups;

    const m = this.menus();

    if (m && m.length > 0) {
      const group: IMenuGroup = {
        title: this.title(),
        menus: m,
        expanded: true,
        icon: undefined,
      };
      return [group];
    }
    return [];
  });

  // ── UiService ────────────────────────────────────────
  uiService = inject(UiService);
  showLeft = toSignal(this.uiService.showleft$, { initialValue: false });
  enterClass = signal('enter-animation');
  ngOnInit(): void {
    // expanded: true 인 패널을 초기 openedPanels 에 반영
    this.openedPanels.set(new Set(this.initOpenedPanels()));
  }
  // 🔥 초기 expanded 상태도 반영
  readonly initOpenedPanels = computed(() => {
    const set = new Set<number>();
    this.resolvedGroups().forEach((g, i) => {
      if (g.expanded) set.add(i);
    });
    return set;
  });
  onClosed(index: number): void {
    this.openedPanels.update(set => {
      const next = new Set(set);
      next.delete(index);
      return next;
    });
  }
  onOpened(index: number): void {
    this.openedPanels.update(set => {
      const next = new Set(set);
      next.add(index);
      return next;
    })
  }
}
