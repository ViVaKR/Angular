import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SharedPage } from '@app/shared/components/shared-page/shared-page';
import { setupPageSeo } from '@app/shared/utilities/seo-helper';
import { MenuService } from '@app/core/services/menu-service';

@Component({
  selector: 'app-transcription',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    SharedPage
  ],
  templateUrl: './transcription.html',
  styleUrl: './transcription.scss',
  host: { 'class': 'route-transcription' },
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Transcription {

  readonly title = '사경';
  private router = inject(Router);
  private menuService = inject(MenuService);

  menus = this.menuService.transcriptionMenus();

  constructor() { this.createSeo(); }

  createSeo() {
    setupPageSeo({
      title: '사경',
      description: '불교경전을 직접 필사, 사경을 통하여 개인 수행을 돕는 페이지 입니다.',
      keywords: '사경, 수행',
      url: 'transcription'
    });
  }

  goTo = (url: string) => this.router.navigate([url]);
}
