import { Component, inject } from '@angular/core';
import { AuthService } from '@app/core/services/auth-service';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-sign-out',
  imports: [
    MatButtonModule
  ],
  templateUrl: './sign-out.html',
  styleUrl: './sign-out.scss',
})
export class SignOut {

  private authService = inject(AuthService);

  async signOut() {
    await this.authService.logout()
  }
}
