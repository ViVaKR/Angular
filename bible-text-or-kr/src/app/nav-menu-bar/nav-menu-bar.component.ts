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
import { ITodayMessage } from '@app/interfaces/i-today-massage';
import { FileManagerService } from '@app/services/file-manager.service';
import { environment } from '@env/environment.development';
import { IFileInfo } from '@app/interfaces/i-file-info';

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

  baseUrl = environment.baseUrl;
  defaultImage = '/login-icon.png';
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
  userAvata = signal(this.defaultImage);
  message: WritableSignal<string> = signal<string>('');
  fileService = inject(FileManagerService);
  isDropdownOpen = false;
  isLoggedIn: boolean = this.authService.isLoggedIn();
  bibleService = inject(BibleService);
  id: any | undefined = undefined;
  isAdmin: boolean = false;
  myInfo: ILoginUser | undefined;
  todayMessageService = inject(TodayMessageService);
  todayMessages: ITodayMessage[] = [];

  @ViewChild('target') target!: HTMLDivElement;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.menuHide = event.target.innerWidth < 989;
    this.cdref.detectChanges();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.tiggerMenu');

    if (!clickedInside)
      this.userSubMenu = false;

  }

  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  menus = [
    { name: '목록', link: '/Bible', tooltip: '전체 회원의 필사 목록' },
    { name: '개요', link: '/Category', tooltip: '성서의 종류 및 요약' }
  ];

  userMenus = [
    { name: '역할관리', link: '/Role', tooltip: '역할 관리' },
    { name: '사용자관리', link: '/UserList', tooltip: '사용자 관리' },
    { name: '나의정보', link: '/Profile', tooltip: '회원 정보 관리' },
    { name: '나의성서', link: '/MyBibleList', tooltip: '나의 성서 필사' },
    { name: '다운로드', link: '/ExportData', tooltip: '나의 성서 필사원본 모두 다운로드 ' },
    { name: '로그아웃', link: '/SignOut', tooltip: '로그아웃' }
  ];

  constructor() {
    this.windowWidth = window.innerWidth;
    this.menuHide = this.windowWidth < 989;
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
      error: (_) => {
        this.isLoggedIn = false;
        this.id = null;
      }
    });

    this.fileService.getAvata.subscribe({

      next: (fileInfo: IFileInfo) => {
        if (fileInfo.dbPath === null || fileInfo.dbPath === undefined || fileInfo.dbPath === '-' || fileInfo.dbPath === '') {
          this.userAvata.set(this.defaultImage);
          return;
        }
        this.userAvata.set(this.createImagePath(`${fileInfo.dbPath}`));
      },
      error: (_) => {
        this.userAvata.set(this.defaultImage)
      }
    });
  }

  ngAfterViewInit(): void {
    this.authService.isAdmin().subscribe({
      next: (res) => this.isAdmin = res,
      error: (_) => this.isAdmin = false
    });

    this.refreshTodayMessage();
    this.loadAvata();
  }

  loadAvata(): void {
    this.fileService.getUserImage().subscribe({
      next: (data: IFileInfo) => {
        if (data.dbPath === null || data.dbPath === undefined || data.dbPath === '-' || data.dbPath === '') {
          this.userAvata.set(this.defaultImage);
          return;
        }
        this.userAvata.set(this.createImagePath(`${this.authService.getUserDetail()?.id}_${data.dbPath}`));
      },
      error: (_) => {
        this.userAvata.set(this.defaultImage)
      }
    });
  }

  createImagePath(fileName: string | null | undefined) {
    return `${this.baseUrl}/images/${fileName}`;
  }

  refreshTodayMessage() {
    this.todayMessageService.getMessages().subscribe({
      next: (res) => {
        this.todayMessages = res;
      },
      error: (_) => this.todayMessages = [
        { id: 0, userId: '-', message: '빛이 있으라' }
      ],
      complete: () => {
        this.getCurrentMessage();
      }
    });
  }

  getCurrentMessage() {
    this.message.set(this.todayMessages[0].message);
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
    this.refreshTodayMessage();
  }

  signOut() {
    this.authService.signOut();
  }
}
