import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { FooterBarComponent } from "./footer-bar/footer-bar.component";
import { SocialLoginModule, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

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
  title = 'vivabm.com';
}
