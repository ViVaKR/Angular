import { JsonPipe, NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
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
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit, AfterViewInit {

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
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signin() {
    this.isSpinner = true;
    this.authService.login(this.form.value).subscribe({
      next: (data) => {
        this.openSnackBar('/Home', '환영합니다.! 로그인 성공하였습니다.', '닫기');
      },
      error: (error) => {
        this.openSnackBar('/SignIn', `로그인 실패: ${error.error.message}`, '재시도');
      }
    })
  }


  ngAfterViewInit(): void { }

  openSnackBar(url: string, message: string, action: string) {
    this.isSpinner = false;
    let ref = this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    this.router.navigate([url]);
  }
}
