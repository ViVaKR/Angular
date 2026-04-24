import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { UniqueValidators } from "@app/core/classes/unique-validators";
import { AuthService } from "@app/core/services/auth-service";

@Injectable({ providedIn: 'root' })
export class SignUpFormFacade {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  readonly form = this.fb.group({
    fullName: ['', Validators.required],
    pseudonym: ['', Validators.required, [UniqueValidators.createPseudonymValidator(this.auth)]],
    email: ['', [Validators.required, Validators.email], [UniqueValidators.createEmailValidator(this.auth)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    avatar: ['default.png', Validators.required],
    roles: [['User'], Validators.required]
  }, { validators: this.passwordMatchValidator });

  submitValue() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return null;
    }
    return this.form.getRawValue();
  }

  private passwordMatchValidator(group: AbstractControl) {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p === c ? null : { passwordMismatch: true };
  }
}

/*
// ✅ 이상적인 구조
FormService (범용)
  ↓ 사용
SignUpFormFacade (회원가입 전용)
  ↓ 사용
SignUpCommand (회원가입 액션)
  ↓ 사용
SignupComponent (UI)

// 다른 폼도 동일 패턴
FormService (범용)
  ↓ 사용
ProductFormFacade (상품 전용)
  ↓ 사용
ProductCommand (상품 액션)
  ↓ 사용
ProductComponent (UI)

*/
