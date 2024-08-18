import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent implements OnInit {

  isSubitting = false;

  authService = inject(AuthService);
  sanckBar = inject(MatSnackBar);
  email: string = '';
  isEmailConfirmed = false;
  isSppinner = false;

  ngOnInit(): void {
    this.authService.getDetail().subscribe({
      next: (res) => {
        if (!res.emailConfirmed) {
          this.email = res.email;
        } else {
          this.sanckBar.open('이미 이메일이 확인되었습니다.', '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error: (err) => {
        this.sanckBar.open(err.message, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    })
  }
}
