import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormConfig } from '../interfaces/i-form-config';

@Injectable({ providedIn: 'root' })
export class FormService {

  constructor(private fb: FormBuilder) { }

  createForm(config: IFormConfig, context?: any): FormGroup {
    const group: any = {};
    config.fields.forEach(field => {
      const validators = field.validators || [];
      let asyncValidators = field.asyncValidators || [];
      if (field.asyncValidatorFactories && context) {
        const factoryValidators = field.asyncValidatorFactories.map(factory => factory(context));
        asyncValidators = [...asyncValidators, ...factoryValidators];
      }
      group[field.name] = [field.defaultValue, validators, asyncValidators];
    });
    const formGroup = this.fb.group(group);
    if (config.formValidators) formGroup.setValidators(config.formValidators);
    return formGroup;
  }

  hasError(form: FormGroup, fieldName: string, errorType: string): boolean {
    const control = form.get(fieldName);
    return !!(control?.hasError(errorType) && control?.touched);
  }

  isFieldPending(form: FormGroup, fieldName: string): boolean {
    return form.get(fieldName)?.pending || false;
  }

  getFieldValue(form: FormGroup, fieldName: string): any {
    return form.get(fieldName)?.value;
  }

  resetForm(form: FormGroup, value?: any) {
    form.reset(value);
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      control?.setErrors(null);
      control?.markAsUntouched();
      control?.markAsPristine();
      control?.updateValueAndValidity();
    });
  }

  deepResetForm(formGroup: FormGroup, value?: any) {
    formGroup.reset(value);

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.deepResetForm(control);
      } else if (control) {
        control.setErrors(null);
        control.markAsUntouched();
        control.markAsPristine();
        control.updateValueAndValidity();
      }
    });
  }
}
