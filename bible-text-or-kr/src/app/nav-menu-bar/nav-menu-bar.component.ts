import { AsyncPipe, CommonModule, NgFor, NgIf, NgIfContext } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostListener, inject, OnInit, QueryList, signal, SimpleChanges, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule, ProgressBarMode } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltip, TooltipComponent } from '@angular/material/tooltip';
import { ActivatedRoute, IsActiveMatchOptions, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { BibleService } from '@app/services/bible.service';
import { AuthService } from '@app/services/auth.service';

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
    MatTooltip,
    MatDividerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
    MatSidenavModule,
    MatSliderModule,
    NgIf,
    NgFor
  ],
  templateUrl: './nav-menu-bar.component.html',
  styleUrl: './nav-menu-bar.component.scss'
})
export class NavMenuBarComponent implements AfterViewInit, OnInit {

  hidden: boolean = true;
  userSubMenu: boolean = false;

  router = inject(Router);
  route = inject(ActivatedRoute);
  cdref = inject(ChangeDetectorRef);
  authService = inject(AuthService);

  mode: ProgressBarMode = 'buffer';
  value = 100;
  bufferValue = 50;
  isProgressBar = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 768) {
      this.hidden = true;
    } else {
      this.hidden = false;
    }
  }
  pvalue = signal<number | undefined>(undefined);
  menus = [
    { name: '목록', link: '/Bible', tooltip: '전체 회원의 필사 목록' },
    { name: '개요', link: '/Category', tooltip: '성서의 종류 및 요약' },
    { name: '필사', link: '/BibleWrite', tooltip: '성서를 필사하는 곳' },
    { name: '로그인', link: '/SignIn', tooltip: '로그인' },
  ];

  userMenus = [
    { name: '나의정보', link: '/Profile', tooltip: '회원 정보 수정' },
    { name: '성서쓰기', link: '/BibleWrite', tooltip: '나의 성서 필사' },
    { name: '다운로드', link: '/ExportData', tooltip: '나의 성서 필사원본 모두 다운로드 ' },
    { name: '로그아웃', link: '/SignOut', tooltip: '로그아웃' },
  ]

  activated: number = -1;

  isLoggedIn: boolean = this.authService.isLoggedIn();
  id: number | null = null;
  isAdmin: boolean = false;


  constructor(private bibleService: BibleService) {

    this.authService.isSignIn.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
        this.id = this.authService.getUserDetail()?.id;
      }
    });

    this.router.events.subscribe(() => {
      this.activated = this.menus.findIndex(menu => menu.link === this.router.url);
    });
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.isAdmin().subscribe({
      next: (res) => {
        this.isAdmin = res;
      }
    });
  }
  ngAfterViewInit(): void {
    this.authService.isSignIn.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
      }
    });
    // this.bibleService.isNavStart.subscribe({
    //   next: (value) => {
    //     this.isProgressBar = value;

    //   }
    // });

    // this.bibleService.isNavEnd.subscribe({
    //   next: (value) => {
    //     delay(1000).then(() => {
    //       this.isProgressBar = value;
    //     }
    //     );
    //   },
    //   complete: () => {
    //     this.isProgressBar = false;
    //   }
    // });
  }

  goTo(url: string, idx: number) {
    this.activated = idx;
    if (this.activated !== -1)
      this.router.navigate([url]);
    else
      this.router.navigate([url], { queryParams: { idx: idx } });
  }

  signOut() {
    this.authService.signOut();
  }

}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
