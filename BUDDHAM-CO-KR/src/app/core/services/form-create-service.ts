import { inject, Injectable, signal } from '@angular/core';
import { FormService } from './form-service';
import { ScriptureService } from './scripture-service';
import { IFormConfig } from '../interfaces/i-form-config';
import { FormGroup } from '@angular/forms';

@Injectable() // * 컴포넌트 레벨에서 제공
export class FormCreateService {

  private formService = inject(FormService);
  private scriptureService = inject(ScriptureService);
  public _fields: IFormConfig | null = null;
  public _form: FormGroup | null = null;

  get form(): FormGroup {
    if (!this._form) {
      throw new Error('FormCreateService: initialize()를 먼저 호출해주세요.');
    }
    return this._form;
  }

  get fields(): IFormConfig {
    if (!this._fields) {
      throw new Error('FormCreateService: initialize()를 먼저 호출해주세요.');
    }
    return this._fields;
  }

  initialize(fields: IFormConfig) {
    this._fields = fields;
    this._form = this.formService.createForm(fields, this.scriptureService);
  }
  submitValue() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return null;
    }
    return this.form.getRawValue();
  }

  hasError(fieldName: string, errorType: string): boolean {
    return this.formService.hasError(this.form, fieldName, errorType);
  }

  isFieldPending(fieldName: string): boolean {
    return this.formService.isFieldPending(this.form, fieldName);
  }

  reset(value?: any): void {
    this.formService.deepResetForm(this.form, value);
  }
}
