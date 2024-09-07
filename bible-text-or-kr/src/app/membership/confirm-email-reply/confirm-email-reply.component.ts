import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IConfirmEmailReplay } from '@app/interfaces/i-confirm-email-replay';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-confirm-email-reply',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './confirm-email-reply.component.html',
  styleUrl: './confirm-email-reply.component.scss'
})
export class ConfirmEmailReplyComponent implements OnInit {

  confirmReplayEmail = {} as IConfirmEmailReplay;
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
    this.authService.confirmReplyEmail(this.confirmReplayEmail).subscribe({
      next: (response) => {
        let ref = this.matSnackBar.open(response.message, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        ref.onAction().subscribe(() => {
          this.router.navigate(['/SingIn']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

}
