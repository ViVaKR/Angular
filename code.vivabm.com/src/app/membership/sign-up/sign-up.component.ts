import { NgIf, CommonModule, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IRole } from '@app/interfaces/i-role';
import { AuthService } from '@app/services/auth.service';
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
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);

  roles$!: Observable<IRole[]>;
  isAdmin: boolean = true;
  form!: FormGroup;
  hidePassword = true;
  roles: IRole[] = [];
  errors: ValidationErrors[] = [];

  constructor() { }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      roles: [['User', 'Writer'], [Validators.required]]
    },
      {
        validators: this.passwordValidator
      });
  }

  signup() {


  }

  // 비밀번호 확인 유효성 검사
  private passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;

  }
}
