import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IRole } from '@app/interfaces/i-role';
import { IValidationError } from '@app/interfaces/i-validation-error';
import { ActionService } from '@app/services/action.service';
import { AuthService } from '@app/services/auth.service';
import { LoadingService } from '@app/services/loading.service';
import { RoleService } from '@app/services/role.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
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
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  fb = inject(FormBuilder);
  router = inject(Router);
  roleService = inject(RoleService);
  roles$!: Observable<IRole[]>;
  isAdmin: boolean = true;
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  loadingService = inject(LoadingService);
  actionService = inject(ActionService);
  form!: FormGroup;
  hidePassword = true;
  roles: IRole[] = [];
  errors: IValidationError[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: [['User', 'Writer'], Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
    this.loadingService.loadingOff();
    this.actionService.nextLoading(false);
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.authService.signUp(this.form.value).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.snackBar.open(`완료: ${response.message}`, '닫기', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.router.navigate(['/sign-in']);

        } else {
          this.snackBar.open('Error', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errors = err.error.errors;
      }
    });
  }


  goToSignIn() {
    this.router.navigate(['/SignIn']);
  }

  onCancel(): void {
    this.router.navigate(['/Home']);
  }
}
