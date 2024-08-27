import { Component, OnInit } from '@angular/core';
import { GoogleSigninButtonModule, SocialAuthService, SocialLoginModule } from "@abacritt/angularx-social-login";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/services/auth.service';
import { IGoogleUserDetail } from '@app/interfaces/i-google-user';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-signin-google',
  standalone: true,
  imports: [
    CommonModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  templateUrl: './signin-google.component.html',
  styleUrl: './signin-google.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SigninGoogleComponent implements OnInit {

  idToken: string;
  name: string;
  id: string;
  photoUrl: string = '';

  constructor(private authService: SocialAuthService, private service: AuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe({
      next: (user) => {
        if (user != null) {
          this.service.googleSignIn(user);

          let googleUserDetail: IGoogleUserDetail = jwtDecode<IGoogleUserDetail>(user.idToken);

          console.log('로그인 성공');
          console.log("idToken", user.idToken);
          console.log('아이디', googleUserDetail.name);
          this.photoUrl = user.photoUrl;

        } else {
          console.log('로그인 실패');
        }
      },
      error: (error) => {
        console.error(error.message);
      },
    })
  }
}
