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
    console.log(this.email);

    this.authService.forgetPassword(this.email).subscribe({
      next: (res) => {
        this.showEmailSent = true;
        if (res.isSuccess) {
          this.showSnackBar('비밀번호 재설정 이메일이 전송되었습니다.');
        } else {
          this.showEmailSent = false;
          this.showSnackBar(res.message);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isSpinner = false;
        var message = "=> " + err.message;
        this.showSnackBar(message);
      },
      complete: () => {
        this.isSubmitting = false;
        this.isSpinner = false;
      }
    });

  }

  showSnackBar(message: string) {

    this.matSnackBar.open(message, '닫기', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

}
