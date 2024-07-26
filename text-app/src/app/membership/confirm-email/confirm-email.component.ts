import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
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
    JsonPipe,
    MatProgressSpinner,
    ReactiveFormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent implements OnInit {

  isSubmitting = false;

  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  email: string = '';
  isEmailConfirmed = false;
  isSpinner: boolean = false;

  ngOnInit(): void {
    this.authService.getDetail().subscribe({
      next: (result) => {
        if (!result.emailConfirmed) {
          this.email = result.email;
        } else {
          this.matSnackBar.open('이미 확인된 이메일입니다.', '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.authService.getDetail().subscribe({
      next: (result) => {
        this.isEmailConfirmed = result.emailConfirmed;
      },
      error: (error) => {
        this.isEmailConfirmed = false;
      }
    });

  }

  confirmEmail() {
    this.isSpinner = true;

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

        this.matSnackBar.open(error.error.message, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      complete: () => {
        this.isSpinner = false;
      }
    });
  }

}
