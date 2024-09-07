import { AsyncPipe, NgFor, NgIf, NgIfContext } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltip, TooltipComponent } from '@angular/material/tooltip';
import { IsActiveMatchOptions, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-menu-bar',
  standalone: true,
  imports: [
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    NgIf,
    NgFor,
    AsyncPipe,
    MatNavList,
    RouterOutlet,
    RouterLink,
    RouterModule,
    NavMenuBarComponent,
    MatTooltip
  ],
  templateUrl: './nav-menu-bar.component.html',
  styleUrl: './nav-menu-bar.component.scss'
})
export class NavMenuBarComponent {
  signOut() {
    throw new Error('Method not implemented.');
  }

  hidden: boolean = true;
  userMenu: boolean = false;

  router = inject(Router);
  cdref = inject(ChangeDetectorRef);

  menus = [
    { name: '목록', link: '/Bible', tooltip: '전체 회원의 필사 목록' },
    { name: '개요', link: '/Category', tooltip: '성서의 종류 및 요약' },
    { name: '필사', link: '/BibleWrite', tooltip: '성서를 필사하는 곳' },
  ];

  activated: number = -1;
  isSignIn = false;

  constructor() {
    this.router.events.subscribe(() => {
      this.activated = this.menus.findIndex(menu => menu.link === this.router.url);
    });
  }

  goTo(url: string, idx: number) {
    this.activated = idx;
    this.router.navigate([url]);
  }
}

