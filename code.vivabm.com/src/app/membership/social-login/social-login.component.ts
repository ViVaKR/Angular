import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { JsonPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';


@Component({
  selector: 'app-social-login',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    GoogleSigninButtonModule
  ],
  templateUrl: './social-login.component.html',
  styleUrl: './social-login.component.scss'
})
export class SocialLoginComponent implements OnInit {

  userInfo: SocialUser | undefined;
  socialAuthService = inject(SocialAuthService);
  router = inject(Router);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  googleLogin: any;


  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      console.log(user);
      this.userInfo = user;
    });
    this.googleLogin = this.afterLoggedIn.bind(this);
  }

  decodeJWTToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  afterLoggedIn(response: any) {
    const responsePayload = this.decodeJWTToken(response.credential)
    console.log(responsePayload)

    localStorage.setItem(this.authService.userKey, JSON.stringify(responsePayload));

    this.router.navigate(['/Home']);

    this.snackBar.open('환영합니다', '닫기', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
