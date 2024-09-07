import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IResetPasswordRequest } from '@app/interfaces/i-reset-password-request';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    JsonPipe,
    MatProgressSpinner
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  resetPassword = {} as IResetPasswordRequest
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.resetPassword.email = params['email'];
      this.resetPassword.token = params['token'];
    });
  }

  resetPasswordHandle() {

    this.authService.resetPassword(this.resetPassword).subscribe({
      next: (res) => {

        let ref = this.matSnackBar.open(res.message, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        ref.onAction().subscribe(() => {
          this.router.navigate(['/Home']);
        });
      },
      error: (error) => {

        this.matSnackBar.open(error.message, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }
}
