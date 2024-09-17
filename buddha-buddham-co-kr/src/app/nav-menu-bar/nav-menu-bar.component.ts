import { NgFor, NgIf } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, HostListener, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ILoginUser } from '@app/interfaces/i-login-user';
import { AuthService } from '@app/services/auth.service';
import { BuddhaService } from '@app/services/buddha.service';
import { TodayMessageService } from '@app/services/today-message.service';

@Component({
  selector: 'app-nav-menu-bar',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  templateUrl: './nav-menu-bar.component.html',
  styleUrl: './nav-menu-bar.component.scss'
})
export class NavMenuBarComponent implements OnInit, AfterViewInit {

  router = inject(Router);
  route = inject(ActivatedRoute);
  cdref = inject(ChangeDetectorRef);
  authService = inject(AuthService);
  buddhaService = inject(BuddhaService);
  messageService = inject(TodayMessageService);
  windowsWidth: number = window.innerWidth;

  menuHide: boolean = true;
  userSubMenu: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowsWidth = event.target.innerWidth;
    this.menuHide = event.target.innerWidth < 989;
    this.cdref.detectChanges();
  }

  menus = [
    { id: 1, name: '경전', link: '/Buddha', memberShip: false, tooltip: '불경 목록' },
    { id: 2, name: '사경', link: '/SutraCreate', memberShip: true, tooltip: '불경 작성' },
  ];

  userMenus = [
    { id: 1, name: '역할관리', link: '/Role', tooltip: '회원 역할 권한 관리' },
    { id: 2, name: '사용자관리', link: '/Users', tooltip: '회원 관리' },
    { id: 3, name: '나의정보', link: '/Profile/Account', tooltip: '나의 정보 관리' },
    { id: 4, name: '나의경전', link: '/MySutra', tooltip: '나의 불교경전 사경 목록' },
    { id: 5, name: '다운로드', link: '/ExportData', tooltip: '나의 불교경전 사경원본 다운로드' },
    { id: 6, name: '부트캠프', link: '/Bootcamp', tooltip: '부트캠프' },
    { id: 7, name: '로그아웃', link: '/SignOut', tooltip: '로그아웃' },
  ];

  isLoggedIn: boolean = this.authService.isLoggedIn();

  userId: string | undefined = undefined;
  isAdmin: boolean = false;
  message: WritableSignal<string> = signal<string>('');
  myInfo: ILoginUser | undefined = undefined;

  constructor() {
    this.windowsWidth = window.innerWidth;
    this.menuHide = window.innerWidth < 989;

    this.messageService.currentMessage.subscribe({
      next: (res) => this.message.set(res.data.message)
    });

  }

  ngOnInit(): void {
    this.authService.isSignIn.subscribe({
      next: (res) => {
        if (res) {
          this.isLoggedIn = res;
          this.myInfo = this.authService.getUserDetail() as ILoginUser;
          this.userId = this.authService.getUserDetail()?.id;
          console.log(this.myInfo);
        } else {
          this.isLoggedIn = false;
          this.userId = undefined;
        }
      },
      error: (_) => this.isLoggedIn = false
    });
  }

  ngAfterViewInit(): void {
    this.authService.isAdmin().subscribe({
      next: (res) => this.isAdmin = res,
      error: (_) => this.isAdmin = false
    });
  }

  getUserSubMenu() {
    return this.isAdmin ? this.userMenus : this.userMenus.filter((_, idx) => idx > 1);
  }

  goTo(url: string, id: string | undefined) {
    console.log(url, id);

    if (id !== undefined)
      this.router.navigate([url, id]);
    else
      this.router.navigate([url]);
  }

  signOut() {
    this.authService.signOut();
  }
}
