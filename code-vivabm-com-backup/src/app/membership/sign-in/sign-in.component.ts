import { JsonPipe, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { IAuthResponse } from '@app/interfaces/i-auth-response';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormField,
    MatIconModule,
    ReactiveFormsModule,
    JsonPipe,
    MatButtonModule,
    RouterLink,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {

  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);
  isSpinner: boolean = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.isSpinner = true;
    this.authService.signIn(this.form.value).subscribe({

      next: (data: IAuthResponse) => {
        if (data.isSuccess)
          this.openSnackBar('/Home', `환영합니다. ${data.message}`, '닫기');
        else
          this.openSnackBar('/SignIn', `${data.message}`, '재시도');
      },
      error: (err: HttpErrorResponse) => {
        this.openSnackBar('/SignIn', `${err.error.message}`, '재시도');
      }
    })
  }

  openSnackBar(url: string, message: string, action: string) {
    this.isSpinner = false;
    this.router.navigate([url]);
    this.snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
