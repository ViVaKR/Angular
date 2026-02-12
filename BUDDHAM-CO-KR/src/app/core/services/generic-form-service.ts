import { inject, Injectable } from '@angular/core';
import { FormService } from './form-service';
import { FormGroup } from '@angular/forms';
import { IFormConfig } from '../interfaces/i-form-config';

/**
 * 제너릭 폼 서비스
 * - 모든 CRUD 폼에서 사용 가능
 * - API 서비스 주입 가능
 */
@Injectable({ providedIn: 'root' })
export class GenericFormService<T = any> {

  private formService = inject(FormService);

  public _apiService: any | null = null;
  get apiService(): any {
    if (!this._apiService) {
      throw new Error('initialize()를 먼저 호출해주세요.');
    }
    return this._apiService;
  }

  public _form: FormGroup | null = null;
  get form(): FormGroup {
    if (!this._form) {
      throw new Error('initialize()를 먼저 호출해주세요.');
    }
    return this._form;
  }

  public _fields: IFormConfig | null = null;
  get fields(): IFormConfig {
    if (!this._fields) {
      throw new Error('initialize()를 먼저 호출해주세요.');
    }
    return this._fields;
  }

  initialize(fields: IFormConfig, apiService: any) {
    this._fields = fields;
    this._apiService = apiService;
    this._form = this.formService.createForm(this.fields, this.apiService);
  }

  /**
   * 폼 값 제출 (유효성 검사 포함)
   * @returns 유효한 경우 폼데이터, 무효한 경우 null
   */
  submitValue(): T | null {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return null;
    }

    return this.form.getRawValue() as T;
  }

  /**
   * 필드 에러 확인
   * @returns
   */
  hasError(fieldName: string, errorType: string): boolean {
    return this.formService.hasError(this.form, fieldName, errorType);
  }

  /**
     * 필드 비동기 검증 대기 중 확인
     */
  isFieldPending(fieldName: string): boolean {
    return this.formService.isFieldPending(this.form, fieldName);
  }

  /**
   * 폼 리셋
   */
  reset(value?: any): void {
    this.formService.deepResetForm(this.form, value);
  }
}
