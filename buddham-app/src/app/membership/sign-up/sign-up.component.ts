import { NgIf, CommonModule, AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ValidationError } from '@app/interfaces/validation-error';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Role } from '@app/interfaces/role';
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
  roles$!: Observable<Role[]>;
  isAdmin: boolean = true;
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);

  form!: FormGroup;
  hidePassword = true;
  roles: Role[] = [];

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

  // 회원가입, 성공시 로그인 페이지로 이동
  signup() {

    this.authService.signup(this.form.value).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.openSnackBar('/SignIn', `회원가입 완료: ${response.message}`, '닫기');
        } else {
          this.openSnackBar('/SignUp', `회원가입 실패: ${response.message}`, '닫기');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errors = error.error;
        this.openSnackBar('/SignUp', `회원가입 실패: ${error.message}`, '닫기');
      }
    })

    // this.authService.signup(this.form.value).subscribe(response => {
    //   if (response.isSuccess) {
    //     this.openSnackBar('/SignIn', `회원가입 완료: ${response.message}`, '닫기');
    //   } else {
    //     this.openSnackBar('/SignUp', `회원가입 실패: ${response.message}`, '닫기');
    //   }
    // }, (error: HttpErrorResponse) => {
    //   this.errors = error.error;
    //   this.openSnackBar('/SignUp', `회원가입 실패: ${error.message}`, '닫기');
    // });
  }

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

  goTo() {
    this.router.navigate(['/SignIn']);
  }

  onCancel() {
    this.router.navigate(['/Home']);
  }
}
