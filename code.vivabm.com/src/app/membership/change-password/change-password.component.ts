import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IChangePasswordRequest } from '@app/interfaces/i-change-password-request';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    RouterOutlet,
    MatSelectModule,
    AsyncPipe
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {

  changeMyPasswordRequest = {} as IChangePasswordRequest;
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  fb = inject(FormBuilder);
  form!: FormGroup;
  hidePassword: boolean = true;

  ngOnInit(): void {
    let email = this.authService.getUserDetail()?.email;
    this.form = this.fb.group({
      email: [email, [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      validators: this.passwordMatchValidator
    });
  }
  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {

    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  changePassword() {

    this.authService.changePassword(this.form.value).subscribe({
      next: (data) => {

        let ref = this.snackBar.open(`비밀번호 변경완료: ${data.message}`, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        ref.afterDismissed().subscribe({
          next: () => {
            this.authService.signOut();
            this.router.navigate(['/']);
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(`비밀번호 변경 실패: ${error.message}`, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }


}
