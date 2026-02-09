import { AbstractControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class FormErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: AbstractControl | null,
    form: FormGroupDirective | NgForm | null): boolean {

    // 1. 기본: 컨트롤 자체가 invalid 하고, 만져졌을 때 (Dirty or Touched)
    const invalidCtrl = !!(control?.invalid && (control?.dirty || control?.touched));

    // 2. ★ 추가: 부모(Form)가 'passwordMismatch' 에러를 가지고 있을 때
    const invalidParent = !!(control?.parent?.hasError('passwordMismatch') && (control?.dirty || control?.touched));

    // 둘 중 하나라도 해당되면 에러 상태(빨간 줄)로 간주!
    return invalidCtrl || invalidParent;
  }
}
