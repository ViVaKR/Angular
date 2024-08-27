import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { FooterBarComponent } from "./footer-bar/footer-bar.component";
import { SocialAuthService, SocialUser, SocialLoginModule, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    SocialLoginModule,
    NavMenuComponent,
    GoogleSigninButtonModule,
    FooterBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vivabm-app';
}
