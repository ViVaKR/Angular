import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SharedPage } from '@app/shared/components/shared-page/shared-page';
import { setupPageSeo } from '@app/shared/utilities/seo-helper';
import { MenuService } from '@app/core/services/menu-service';

@Component({
  selector: 'app-communication',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    SharedPage
  ],
  templateUrl: './communication.html',
  host: { 'class': 'route-communication' },
  styleUrl: './communication.scss',
})
export class Communication {
  readonly title = '소통';
  private router = inject(Router);
  private menuService = inject(MenuService);

  menus = this.menuService.communicationMenus();

  constructor() { this.createSeo(); }

  createSeo() {
    setupPageSeo({
      title: '소통',
      description: '불교인 및 회원들 비회원간의 격의 없는 만남 및 자료 교환의 장입니다.',
      keywords: '불교인 소통, 회원소통, 불교자료교환, 종교인간의 대화, 소통',
      url: 'communication'
    });
  }
  goTo = (url: string) => this.router.navigate([url]);
}
