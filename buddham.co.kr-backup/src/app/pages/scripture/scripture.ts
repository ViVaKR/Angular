import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SharedPage } from '@app/shared/components/shared-page/shared-page';
import { setupPageSeo } from '@app/shared/utilities/seo-helper';
import { Router } from '@angular/router';
import { MenuService } from '@app/core/services/menu-service';

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

  menus = this.menuService.scriptureMenus();

  constructor() { this.createSeo(); }
  createSeo() {
    setupPageSeo({
      title: '경전',
      description: '팔만대장경을 기반으로 한 불교경전 데이터베이스입니다.',
      keywords: '불교경전, 팔만대장경',
      url: 'scripture'
    });
  }

  goTo = (url: string) => this.router.navigate([url]);
}
