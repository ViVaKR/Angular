import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit, AfterViewInit {

  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  signin() {
    this.authService.login(this.form.value).subscribe(response => {
      if (response.isSuccess) {
        this.openSnackBar('/Home', response.message, '닫기');
      } else {
      }
    }, error => { },
      () => { });
  }

  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngAfterViewInit(): void { }

  openSnackBar(url: string, message: string, action: string) {
    let ref = this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    ref.onAction().subscribe(() => {
      this.router.navigate([url]);
    });
  }
}
