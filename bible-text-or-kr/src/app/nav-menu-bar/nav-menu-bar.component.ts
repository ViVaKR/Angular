import { AsyncPipe, NgFor, NgIf, NgIfContext } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
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
    NavMenuBarComponent
  ],
  templateUrl: './nav-menu-bar.component.html',
  styleUrl: './nav-menu-bar.component.scss'
})
export class NavMenuBarComponent {

  hidden: boolean = true;
  userMenu: boolean = false;

  router = inject(Router);
  cdref = inject(ChangeDetectorRef);

  menus = [
    { name: 'Home', link: '/Home' },
    { name: '필사목록', link: '/BibleList' },
    { name: '성경', link: '/Category' },
    { name: '필사', link: '/BibleWrite' },
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

