import { Component, inject } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { IMenu } from '@app/interfaces/i-menu';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss'
})
export class NavMenu {

  title = "메뉴바";
  router = inject(Router);

  mainMenus: IMenu[] = [
    { id: 0, url: '/Home', name: '홈', icon: 'home' },
    { id: 1, url: '/Post', name: '글', icon: 'article' },
    { id: 2, url: '/Blog', name: '블러그', icon: 'web_stories' },
    { id: 3, url: '/Document', name: '문서', icon: 'description' },
    { id: 4, url: '/Lab', name: '연구소', icon: 'science' },
    { id: 5, url: '/Chat', name: '소통', icon: 'chat' },
    { id: 6, url: '/Demo', name: '데모', icon: 'stream' },
    { id: 7, url: '/Demo/List', name: '목록', icon: 'stream' },
  ];

  membershipMenus: IMenu[] = [
    { id: 0, url: '/SignUp', name: '회원가입', icon: 'how_to_reg' },
    { id: 1, url: '/SignIn', name: '로그인', icon: 'login' },
    { id: 2, url: '/SignOut', name: '로그아웃', icon: 'logout' },
    { id: 3, url: '/Profile', name: '나의정보', icon: 'manage_accounts' },
  ];

  goTo(url: string, event?: MouseEvent) {
    if (event) {
      event.preventDefault(); // href="#" 의 기본 동작 방지
    }

    if (url.startsWith('http://')
      || url.startsWith('https://')) {

      // 외부 링크 처리
      window.open(url, '_blank'); // 새탭에서 열기
    } else {
      this.router.navigate([url]);
    }
  }
}
