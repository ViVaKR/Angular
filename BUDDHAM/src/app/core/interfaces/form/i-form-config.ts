import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { IFormFieldConfig } from "./i-form-field-config";

export type FormValidatorFn = (group: AbstractControl) => ValidationErrors | null;
export type AsyncFormValidatorFn = (group: AbstractControl) => Observable<ValidationErrors | null>;

export interface IFormConfig {
  fields: IFormFieldConfig[];
  formValidators?: FormValidatorFn[]; // 동기 폼 레벨 validator
  asyncFormValidators?: AsyncFormValidatorFn[]; // 비동기 폼 레벨 validator
  asyncFormValidatorFactories?: ((context: any) => AsyncFormValidatorFn)[];
}
