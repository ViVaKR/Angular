import { AsyncValidatorFn, Validators } from "@angular/forms";

export interface IFormFieldConfig {

  name: string;
  defaultValue: any;
  validators?: Validators[];
  asyncValidators?: AsyncValidatorFn[];
  asyncValidatorFactories?: ((context: any) => AsyncValidatorFn)[];
  type?: 'text' | 'email' | 'password' | 'select' | 'file' | 'number' | 'date' | 'json';
  disabled?: boolean; // 읽기 전용 필드 처리
  hidden?: boolean;  // 숨김 필드
  commentary?: string;

}
