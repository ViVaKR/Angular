import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
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
    MatButtonModule,
    MatTooltipModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './nav-menu-bar.component.html',
  styleUrl: './nav-menu-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuBarComponent implements OnInit, AfterViewInit, AfterContentChecked {

  selectedItem!: any | null;



  router = inject(Router);
  route = inject(ActivatedRoute);
  cdref = inject(ChangeDetectorRef);
  authService = inject(AuthService);
  buddhaService = inject(BuddhaService);
  messageService = inject(TodayMessageService);

  windowsWidth: number = window.innerWidth;

  menuHide: boolean = true;
  userSubMenu: boolean = false;

  fb = new FormControl('');

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowsWidth = event.target.innerWidth;
    this.menuHide = event.target.innerWidth < 989;
    this.cdref.detectChanges();
  }
  isEmailConfirmed!: boolean;
  get getConfirmed() {
    return this.isEmailConfirmed;
  }
  set setConfirmed(value: boolean) {
    this.isEmailConfirmed = value;
    this.cdref.detectChanges();
  }

  userMenus = [
    { id: 1, name: '역할관리', link: '/Role', tooltip: '회원 역할 권한 관리', enabled: true },
    { id: 2, name: '사용자관리', link: '/Users', tooltip: '회원 관리', enabled: true },
    { id: 3, name: '나의정보', link: '/Profile/Account', tooltip: '나의 정보 관리', enabled: true },
    { id: 4, name: '경전사경', link: '/SutraCreate', tooltip: '나의 불교경전 사경하기', enabled: this.getConfirmed },
    { id: 5, name: '다운로드', link: '/ExportData', tooltip: '나의 불교경전 사경원본 다운로드', enabled: true },
    { id: 6, name: '부트캠프', link: '/Bootcamp', tooltip: '부트캠프', enabled: true },
    { id: 7, name: '로그아웃', link: '/SignOut', tooltip: '로그아웃', enabled: true },
  ];

  isLoggedIn: boolean = this.authService.isLoggedIn();
  userId: string | undefined = undefined;
  isAdmin: boolean = false;
  message: WritableSignal<string> = signal<string>('');
  myInfo: ILoginUser | undefined = undefined;

  protocol = window.location.protocol;
  portNumber = window.location.port;
  hostName = window.location.hostname;
  pathName = window.location.pathname;
  href = window.location.href;

  getCurrentUrl(url: string) {
    return `${this.protocol}\/\/${this.hostName}:${this.portNumber}${url}`;
  }

  constructor() {
    this.cdref.detach();
    this.windowsWidth = window.innerWidth;
    this.menuHide = window.innerWidth < 989;
    this.messageService.currentMessage.subscribe({

      next: (res) => this.message.set(res.data.message)
    });

    this.href = window.location.href;
  }

  ngOnInit(): void {
    this.authService.isSignIn.subscribe({
      next: (res) => {
        if (res) {
          this.isLoggedIn = res;
          this.myInfo = this.authService.getUserDetail() as ILoginUser;
          this.userId = this.authService.getUserDetail()?.id;
          this.authService.getDetail().subscribe({
            next: (result) => this.setConfirmed = result.emailConfirmed,
            error: (_) => this.setConfirmed = false
          });
        } else {
          this.isLoggedIn = false;
          this.userId = undefined;
        }
      },
      error: (_) => { this.isLoggedIn = false; this.userId = undefined; }
    });
  }

  @ViewChild('buttonGroup') buttonGroup!: MatButtonToggleGroup;

  ngAfterViewInit(): void {
    // 시작시 첫번째 버튼을 선택
    this.authService.isAdmin().subscribe({
      next: (res) => this.isAdmin = res,
      error: (_) => this.isAdmin = false
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  getUserSubMenu() {
    return this.isAdmin
      ? this.userMenus
      : this.userMenus.filter((_, idx) => idx > 1);
  }

  onToggleChange(event: MatButtonToggleChange): void {
    this.selectedItem = event.source.buttonToggleGroup?.value;
  }

  selected: WritableSignal<boolean | undefined> = signal(undefined);

  goTo(url: string, id: any = undefined, clear: boolean = false) {

    if (clear) this.selected.set(undefined);

    if (id !== undefined) this.router.navigate([url, id]);
    else this.router.navigate([url]);
    this.userSubMenu = false;
  }

  signOut() {
    this.authService.signOut();
  }
}
