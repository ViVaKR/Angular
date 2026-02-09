import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { IMenu } from '@app/core/interfaces/i-menu';
import { setupPageSeo } from '@app/shared/utilities/seo-helper';
import { MenuService } from '@app/core/services/menu-service';
import { SharedPage } from "@app/shared/components/shared-page/shared-page";

@Component({
  selector: 'app-about',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    SharedPage
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  host: { 'class': 'route-about' }

})
export class About {

  readonly title = '안내';
  private router = inject(Router);
  private menuService = inject(MenuService);

  menus: IMenu[] = this.menuService.aboutMenus();

  constructor() { this.createSeo(); }

  createSeo() {
    setupPageSeo({
      title: '소개',
      description: '불교 경전을 누구나 쉽게 접근하고 사경을 통하여 개인 수행을 돕는 플랫폼입니다.',
      keywords: '사경, 불교자료, 경전해설, 이용안내, 소개',
      url: 'about'
    });
  }

  goTo = (url: string) => this.router.navigate([url]);
}
