import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgFor,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuItems = [
    { name: 'Home', alias: '홈', link: '/Home' },
    { name: 'PalmanDaeJangGyeong', alias: '팔만 대장경', link: '/PalmanDaeJangGyeong' },
    { name: 'Admin', alias: '로그인', link: '/Admin', }
  ];

  /**
   *
   */
  constructor(private router: Router) {
  }

  goNav(link: string) {
    this.router.navigate([link]);
  }
}
