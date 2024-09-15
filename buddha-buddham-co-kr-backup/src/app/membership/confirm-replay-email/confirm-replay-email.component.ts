import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmReplayEmail } from '@app/interfaces/confirm-replay-email';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-confirm-replay-email',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './confirm-replay-email.component.html',
  styleUrl: './confirm-replay-email.component.scss'
})
export class ConfirmReplayEmailComponent implements OnInit {

  confirmReplayEmail = {} as ConfirmReplayEmail;
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isSubmitting = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.confirmReplayEmail.email = params['email'];
      this.confirmReplayEmail.token = params['token'];
    });
  }

  confrimReplaySendMail() {
    this.isSubmitting = true;
    this.authService.confirmReplayEmail(this.confirmReplayEmail).subscribe({
      next: (response) => {
        let ref = this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        ref.onAction().subscribe(() => {
          this.router.navigate(['/SingIn']);
        });
      },
      error: (error) => {
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }
}
