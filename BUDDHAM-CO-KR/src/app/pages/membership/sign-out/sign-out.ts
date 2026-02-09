import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RsCode } from '@app/core/enums/rs-code';
import { IBottomSheet } from '@app/core/interfaces/i-bottom-sheet';
import { IResponse } from '@app/core/interfaces/i-response';
import { AlertService } from '@app/core/services/alert-service';
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
