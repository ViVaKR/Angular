import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Role } from '@app/interfaces/role';
import { ValidationError } from '@app/interfaces/validation-error';
import { AuthService } from '@app/services/auth.service';
import { MessageService } from '@app/services/message.service';
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
  roles$!: Observable<Role[]>;
  roles: Role[] = [];
  authService = inject(AuthService);
  messageService = inject(MessageService);
  isAdmin: boolean = true;

  form!: FormGroup;
  hidePassword: boolean = true;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      roles: [['User', 'Writer'], [Validators.required]],
    },
      {
        validators: this.passwordMatchValidator
      });
    this.roles$ = this.roleService.getRoles();
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
  errors: ValidationError[] = [];

  signUp() {
    this.authService.signUp(this.form.value).subscribe({
      next: (response) => {
        this.messageService.openSnackBar('Registration successful');
        this.router.navigate(['/SignIn']);
      },
      error: (error) => {
        this.errors = error.error;
      }
    });
  }

  goTo() {
    this.router.navigate(['/SignIn']);
  }

  onCanCle() {
    this.router.navigate(['/Home']);
  }
}
