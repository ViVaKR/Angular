import { JsonPipe } from '@angular/common';
import { Component, inject, Inject, OnInit, ViewContainerRef } from '@angular/core';
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
export class ProfileComponent implements OnInit {

  authServices = inject(AuthService);

  id = this.authServices.getUserDetail()?.id;

  isLoggedIn: boolean = this.authServices.isLoggedIn();

  activatedRoute = inject(ActivatedRoute);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((paraMap) => {
      const prarmValue = paraMap.get('id');
      if (prarmValue) {
        this.id = prarmValue;
        console.log(this.id);
      }
    });
  }

  goTo(URL: string, id: string) {
    this.router.navigate([URL], { queryParams: { id: id } });
  }

  menus = [
    { URL: "/Profile/MySutra", Name: '경전쓰기', },
    { URL: "/Profile/Account", Name: '나의카드' },
    { URL: "/Profile/MyInfo", Name: '정보관리' },
    { URL: `/Profile/ResetPassword`, Name: 'My Password' },
    { URL: `/Profile/ChangePassword`, Name: '비밀번호 변경' },
    { URL: `/Profile/Cancel`, Name: '회원탈퇴' },
  ];
}

