import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUp implements OnInit {

  fb = inject(FormBuilder);
  router = inject(Router);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPasword: ['', Validators.required],
      role: [['User'], Validators.required]
    })
  }
  // AbstractControl 대신 FormGroup 타입을 명시적으로 사용하면 더 정확함
  // (그룹 레벨 유효성 검사기이므로 FormGroup을 받음)
  // private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword'); // 오타 수정: confirmPasword -> confirmPassword

  //   // 컨트롤이 없거나 아직 값이 입력되지 않았다면 유효성 검사 통과
  //   if (!password || !confirmPassword || confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
  //     return null;
  //   }

  //   if (password.value !== confirmPassword.value) {
  //     confirmPassword.setErrors({ passwordMismatch: true }); // 일치하지 않을 때 confirmPassword에 에러 설정
  //     return { passwordMismatch: true };
  //   } else {
  //     // 일치하면 confirmPassword의 passwordMismatch 에러 제거
  //     if (confirmPassword.hasError('passwordMismatch')) {
  //       const errors = { ...confirmPassword.errors };
  //       delete errors['passwordMismatch'];
  //       confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
  //     }
  //     return null;
  //   }

  // }

}

// {
//   validators: this.passwordMatchValidator // 'validator' 대신 'validators' 배열로 전달
// });

// {
//   validators: this.passwordMatchValidator // 'validator' 대신 'validators' 배열로 전달
// });
