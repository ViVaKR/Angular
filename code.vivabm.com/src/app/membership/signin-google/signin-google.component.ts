import { Component, inject, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SocialLoginService } from '@app/services/social-login.service';

declare const google: any;

@Component({
  selector: 'app-signin-google',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './signin-google.component.html',
  styleUrl: './signin-google.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
export class SigninGoogleComponent implements OnInit {

  socialService = inject(SocialLoginService);
  router = inject(Router);
  msg: string = '';
  avail: boolean = false;

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }
  initializeGoogleSignIn() {
    debugger

    google.accounts.id.initialize({
      client_id: '1047896939272-pgva8msa1u5as0ts9io1uvtiist194ds.apps.googleusercontent.com',
      callback: this.handleCredentialResponse(this)
    })

  }
  triggerGoogleSignIn() {
    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Try manual rendering
        google.accounts.id.renderButton(
          document.getElementById("googleLoginButton"),
          { theme: "outline", size: "large", text: "continue_with" }
        );
      }
    });
  }

  handleCredentialResponse(response: any) {
    // this.socialService.googleLogin(response.credential).subscribe(
    //   (res) => {
    //     if (res.isNewUser) {
    //       // Handle new user registration
    //       console.log('New user registered via Google');
    //     } else {
    //       // Handle existing user login
    //       console.log('Existing user logged in via Google');
    //     }
    //     this.router.navigate(['']);
    //   }, (error) => {
    //     console.error('Google authentication failed', error);
    //     this.avail = true;
    //     this.msg = 'Google authentication failed. Please try again.';
    //   }
    // );
  }
}
