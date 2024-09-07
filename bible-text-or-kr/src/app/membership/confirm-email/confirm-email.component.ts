import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
  snackBar = inject(MatSnackBar);
  email: string = '';
  isEmailConfirmed = false;
  isSpinner: boolean = false;

  ngOnInit(): void {
    this.authService.getDetail().subscribe({
      next: (res) => {
        if (!res.emailConfirmed) {
          this.email = res.email;
        } else {
          this.snackBar.open('이미 이메일이 확인되었습니다.', '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error: (err) => {
        this.snackBar.open(err.message, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    })
  }

  confirmEmail() {
    this.isSpinner = true;

    this.authService.confirmSendEmail(this.email).subscribe({ // Send email to reset password
      next: (response) => {
        if (response.isSuccess) {

          this.snackBar.open(`${response.message}`, '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        } else {
          this.snackBar.open(response.message, '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.error.message, '닫기', {
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
