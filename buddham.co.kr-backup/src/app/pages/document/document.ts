import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SharedPage } from '@app/shared/components/shared-page/shared-page';
import { Router } from '@angular/router';
import { SeoService } from '@app/core/services/seo-service';
import { HelperService } from '@app/core/services/helper-service';
import { MenuService } from '@app/core/services/menu-service';

@Component({
  selector: 'app-document',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    SharedPage
  ],
  templateUrl: './document.html',
  styleUrl: './document.scss',
  host: { 'class': 'route-document' }
})
export class Document implements OnInit {

  readonly title = '문서';
  private seoService = inject(SeoService);
  private router = inject(Router);
  private helperService = inject(HelperService);
  private menuService = inject(MenuService);

  // menus = documentMenus();

  readonly menus = this.menuService.documentMenus();

  constructor() {
  }

  ngOnInit(): void {
    this.createSeo();
  }

  createSeo() {
    this.seoService.updateMetaTags({
      title: `문서 - Buddhist Scripture`,
      description: '불교경전에 관련한 문서 및 불화등의 관련 자료실입니다.',
      keywords: `Buddha, 불교 경전, 불교문서, 불교해설서, 불교자료실, 불교예절, 불교상식`,
      url: `https://buddham.co.kr/document`,
      type: 'website',
      twitterCard: 'summary'
    });
  }

  goTo = (url: string) => this.router.navigate([url]);
}


