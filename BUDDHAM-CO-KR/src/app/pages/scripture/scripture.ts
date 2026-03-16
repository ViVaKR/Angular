import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SharedPage } from '@app/shared/components/shared-page/shared-page';
import { setupPageSeo } from '@app/shared/utilities/seo-helper';
import { Router } from '@angular/router';
import { MenuService } from '@app/core/services/menu-service';
import { IMenuGroup } from '@app/core/interfaces/i-menu-config';

@Component({
  selector: 'app-scripture',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    SharedPage
  ],
  templateUrl: './scripture.html',
  styleUrl: './scripture.scss',
  host: { 'class': 'route-scripture' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Scripture {

  readonly title = '경전';
  private router = inject(Router);
  private menuService = inject(MenuService);

  // 여러그룹을 하나의 배열로
  readonly menuGroups = computed<IMenuGroup[]>(() => [
    {
      title: '경전 모음',
      icon: this.menuService.folderOpen,
      expanded: true,
      menus: this.menuService.scriptureMenus()
    },
    {
      title: '경전 구절',
      icon: this.menuService.folderOpen,
      expanded: false,
      menus: this.menuService.scriptureParagraphMenus()
    },
    {
      title: '경전 사경',
      icon: this.menuService.folderOpen,
      expanded: false,
      menus: this.menuService.scriptureTranscriptionMenus()
    },
  ]);

  constructor() { this.createSeo(); }

  createSeo() {
    setupPageSeo({
      title: '경전',
      description: '팔만대장경을 기반으로 한 불교경전 데이터베이스입니다.',
      keywords: '불교경전, 팔만대장경',
      url: 'Scripture'
    });
  }

  goTo = async (url: string) => await this.router.navigate([url]);
}
