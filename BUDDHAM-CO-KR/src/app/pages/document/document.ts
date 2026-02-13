import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SharedPage } from '@app/shared/components/shared-page/shared-page';
import { Router } from '@angular/router';
import { SeoService } from '@app/core/services/seo-service';
import { MenuService } from '@app/core/services/menu-service';
import { Paths } from '@app/data/menu-data';

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

  readonly title = Paths.Document.url;

  private menuService = inject(MenuService);
  private seoService = inject(SeoService);
  private router = inject(Router);
  readonly menus = this.menuService.documentMenus();

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


