import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule, ProgressBarMode } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { BibleService } from '@app/services/bible.service';
import { AuthService } from '@app/services/auth.service';
import { ILoginUser } from '@app/interfaces/i-login-user';
import { TodayMessageService } from '@app/services/today-message.service';
import { IResponse } from '@app/interfaces/i-response';

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
    MatSliderModule
  ],
  templateUrl: './nav-menu-bar.component.html',
  styleUrl: './nav-menu-bar.component.scss'
})
export class NavMenuBarComponent implements AfterViewInit, OnInit {

  menuHide: boolean = true;
  userSubMenu: boolean = false;

  router = inject(Router);
  route = inject(ActivatedRoute);
  cdref = inject(ChangeDetectorRef);
  authService = inject(AuthService);

  mode: ProgressBarMode = 'buffer';
  value = 100;
  bufferValue = 50;
  isProgressBar = true;
  windowWidth: number = window.innerWidth;

  @ViewChild('target') target!: HTMLDivElement;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.menuHide = event.target.innerWidth < 989;
    this.cdref.detectChanges();
  }

  // pvalue = signal<number | undefined>(undefined);

  menus = [
    { name: '목록', link: '/Bible', tooltip: '전체 회원의 필사 목록' },
    { name: '개요', link: '/Category', tooltip: '성서의 종류 및 요약' },
    { name: '필사', link: '/BibleWrite', tooltip: '성서를 필사하는 곳' }
  ];

  userMenus = [
    { name: '역할관리', link: '/Role', tooltip: '역할 관리' },
    { name: '사용자관리', link: '/UserList', tooltip: '사용자 관리' },
    { name: '나의정보', link: '/Profile', tooltip: '회원 정보 관리' },
    { name: '나의성서', link: '/MyBibleList', tooltip: '나의 성서 필사' },
    { name: '다운로드', link: '/ExportData', tooltip: '나의 성서 필사원본 모두 다운로드 ' },
    { name: '부트캠프', link: '/Playground', tooltip: '부트캠프' },
    { name: '로그아웃', link: '/SignOut', tooltip: '로그아웃' }
  ];

  isLoggedIn: boolean = this.authService.isLoggedIn();
  bibleService = inject(BibleService);
  id: any | undefined = undefined;
  isAdmin: boolean = false;
  message: WritableSignal<string> = signal<string>('');

  myInfo: ILoginUser | undefined;
  messageService = inject(TodayMessageService);

  constructor() {
    this.windowWidth = window.innerWidth;
    this.menuHide = this.windowWidth < 989;
    // 오늘의 한줄 묵상을 받아온다.
    this.messageService.currentMessage.subscribe({
      next: (res: IResponse) => {
        this.message.set(res.data.message);
      }
    });
  }

  ngOnInit(): void {

    this.authService.isSignIn.subscribe({
      next: (res) => {
        if (res) {
          this.isLoggedIn = res;
          this.myInfo = this.authService.getUserDetail() as ILoginUser;
          this.id = this.authService.getUserDetail()?.id;
        } else {
          this.isLoggedIn = false;
          this.id = null;
        }
      },
      error: (_) => { this.isLoggedIn = false; }
    });

  }

  ngAfterViewInit(): void {
    this.authService.isAdmin().subscribe({
      next: (res) => {
        this.isAdmin = res;
      },
      error: (_) => {
        this.isAdmin = false;
      }
    });
  }

  getUserSubMenu() {
    return this.isAdmin ? this.userMenus : this.userMenus.filter((_, idx) => idx > 1);
  }

  goTo(url: string, id: number) {

    if (id === 0)
      this.router.navigate([url]);
    else
      this.router.navigate([url], { queryParams: { id: id } });

    this.userSubMenu = false;
  }

  signOut() {
    this.authService.signOut();
  }
}
