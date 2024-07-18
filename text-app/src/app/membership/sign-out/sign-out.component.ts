import { Component, inject, output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AuthService } from '@app/services/auth.service';
@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss'
})
export class SignOutComponent {

  authService = inject(AuthService);
  signOut() {
    this.authService.logout();
  }

  title = 'Sign Out';
}
