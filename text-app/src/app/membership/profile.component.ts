import { JsonPipe } from '@angular/common';
import { Component, inject, Inject, ViewContainerRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Route, RouterOutlet, RouterLink, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { SignOutComponent } from "./sign-out/sign-out.component";
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    JsonPipe,
    RouterOutlet,
    RouterModule,
    SignOutComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  helloworld!: string;

  handleNameChange($event: Event) {
    this.helloworld = $event + ' from ProfileComponent';
  }

  showNewName($event: string) {
    console.log($event + ' from ProfileComponent');
  }

  authServices = inject(AuthService);

  constructor(private router: Router, private route: ActivatedRoute,
    private viewContainerRef: ViewContainerRef
  ) { }

  goTo(URL: string) {
    this.router.navigate([URL], { relativeTo: this.route });
  }
  data: any = 'Profile';

  menus = [
    { URL: 'Dashboard', Name: '대시보드' },
    { URL: 'MyInfo', Name: '정보관리' },
    { URL: 'ChangePassword', Name: '비밀번호 변경' },
    { URL: 'FindPassword', Name: '비밀번호 찾기' },
    { URL: 'Cancel', Name: '회원탈퇴' },
    { URL: 'SignOut', Name: '로그아웃' },
  ];
}
