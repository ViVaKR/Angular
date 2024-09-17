import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    NgIf,
    NgFor,
    MatProgressSpinner,
    ReactiveFormsModule

  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  email!: string;

  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);

  showEmailSent = false;
  isSubmitting = false;
  isSpinner: boolean = false;

  forgetPassword() {
    this.isSpinner = true;
    this.isSubmitting = true;
    this.authService.forgetPwd(this.email).subscribe({ // Send email to reset password
      next: (response) => {
        if (response.isSuccess) {
          this.isSpinner = false;
          this.showEmailSent = true
          this.matSnackBar.open(`${response.message}`, '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        } else {
          this.isSpinner = false;
          this.showEmailSent = false;
          this.matSnackBar.open(response.message, '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isSpinner = false;
        this.showEmailSent = false;
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
