import { AsyncValidatorFn, Validators } from "@angular/forms";

export interface IFormFieldConfig {
  name: string;
  defaultValue: any;
  validators?: Validators[];
  asyncValidators?: AsyncValidatorFn[];
  asyncValidatorFactories?: ((context: any) => AsyncValidatorFn)[];
  type?: 'text' | 'email' | 'password' | 'select' | 'file';
}
