import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmEmailRequest } from '@app/interfaces/confirm-email-request';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    JsonPipe
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent {

  isSubmitting = false;

  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  email: string = '';
  confirmEmail() {
    this.authService.confirmEamil(this.email).subscribe({ // Send email to reset password
      next: (response) => {
        if (response.isSuccess) {

          this.matSnackBar.open(`${response.message}`, '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        } else {

          this.matSnackBar.open(response.message, '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error: (error: HttpErrorResponse) => {

        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

}
