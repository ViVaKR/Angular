import { JsonPipe, NgFor, NgIf } from '@angular/common';
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
    NgIf,
    NgFor
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  authServices = inject(AuthService);

  id = this.authServices.getUserDetail()?.id;

  isLoggedIn: boolean = this.authServices.isLoggedIn();

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
            { URL: "/Profile/MySutra", Name: '사경(寫經)' },
            { URL: `/Profile/ChangePassword`, Name: '비밀번호 변경' },
            { URL: `/Profile/Cancel`, Name: '가입해지' },
          ];
        } else {
          this.confirmed = false;
          this.menus = [
            { URL: "/Profile/Account", Name: '회원정보' },
            { URL: "/Profile/ConfirmEmail", Name: '사경(寫經)' },
            { URL: "/Profile/ConfirmEmail", Name: '미인증 메일' },
            { URL: `/Profile/ChangePassword`, Name: '비밀번호 변경' },
            { URL: `/Profile/Cancel`, Name: '가입해지' },
          ];
        }
      },
      error: (error) => {
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

