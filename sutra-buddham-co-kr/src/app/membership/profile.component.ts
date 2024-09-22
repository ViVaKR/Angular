import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterModule, ActivatedRoute } from '@angular/router';
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
    NgIf,
    NgFor
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  authServices = inject(AuthService);

  id = this.authServices.getUserDetail()?.id;

  activatedRoute = inject(ActivatedRoute);

  confirmed = false;

  menus: { URL: string, Name: string }[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((paraMap) => {
      const prarmValue = paraMap.get('id');
      if (prarmValue) {
        this.id = prarmValue;
      }
    });

    this.authServices.getDetail().subscribe({
      next: (result) => {
        if (result.emailConfirmed) {
          this.confirmed = true;
          this.menus = [
            { URL: "/Profile/Account", Name: '회원정보' },
            { URL: "/Profile/MySutraList", Name: '나의 경전목록' },
            { URL: "/Profile/MySutra", Name: '불교경전 쓰기' },
            { URL: `/Profile/ChangePassword`, Name: '비밀번호 변경' },
            { URL: `/Profile/UpdateUser`, Name: '나의필명 수정' },
            // { URL: '/Profile/PlayGround', Name: '연습장' },
            { URL: `/Profile/Cancel`, Name: '가입해지' },
          ];
        } else {
          this.confirmed = false;
          this.menus = [
            { URL: "/Profile/Account", Name: '회원정보' },
            { URL: "/Profile/ConfirmEmail", Name: '미인증 인증' },
            { URL: `/Profile/ChangePassword`, Name: '비밀번호 변경' },
            { URL: `/Profile/UpdateUser`, Name: '나의필명 수정' },
            { URL: `/Profile/Cancel`, Name: '가입해지' },
          ];
        }
      },
      error: (_) => {
        this.confirmed = false;
        this.menus = [];
        this.router.navigate(['/SignIn']);
      }
    });
  }

  goTo(URL: string, id: string) {
    this.router.navigate([URL], { queryParams: { id: id } });
  }
}

