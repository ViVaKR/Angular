import { inject, Injectable } from '@angular/core';
import { FormService } from './form-service';
import { FormGroup } from '@angular/forms';
import { IFormConfig } from '../interfaces/form/i-form-config';
import { Observable } from 'rxjs';

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

  // ── 에러 관련 ──────────────────────────────────
  hasError(fieldName: string, errorType: string): boolean {
    return this.formService.hasError(this.form, fieldName, errorType);
  }

  getFieldErrorMessage(fieldName: string): string {
    return this.formService.getFieldErrorMessage(this.form, fieldName);
  }

  isFieldAffectedByFormError(fieldName: string): boolean {
    return this.formService.isFieldAffectedByFormError(this.form, fieldName);
  }

  // ── 상태 확인 ──────────────────────────────────
  isFieldPending(fieldName: string): boolean {
    return this.formService.isFieldPending(this.form, fieldName);
  }

  get isValid(): boolean {
    return this.formService.isFormValid(this.form);
  }

  get isChanged(): boolean {
    return this.formService.isFormChanged(this.form);
  }

  // ── 필드 조작 ──────────────────────────────────
  setValue(fieldName: string, value: any): void {
    this.formService.setFieldValue(this.form, fieldName, value);
  }

  getValue(fieldName: string): any {
    return this.formService.getFieldValue(this.form, fieldName);
  }

  enableField(fieldName: string, enable: boolean = true): void {
    this.formService.enableField(this.form, fieldName, enable);
  }

  // ── 검증 ───────────────────────────────────────
  markAllTouched(): void {
    this.formService.markFormGroupTouched(this.form);
  }

  // ── 감시 ───────────────────────────────────────
  watchField(fieldName: string, debounceMs = 300): Observable<any> {
    return this.formService.watchFieldChanges(this.form, fieldName, debounceMs);
  }

  watchForm(debounceMs = 300): Observable<any> {
    return this.formService.watchFormChanges(this.form, debounceMs);
  }

  // ── 리셋 ───────────────────────────────────────
  reset(value?: any): void {
    this.formService.deepResetForm(this.form, value);
  }

  resetWithConfig(value?: any): void {
    this.formService.resetFormWithConfig(this.form, this.fields, value);
  }

  // ── 디버그 ─────────────────────────────────────
  debug(title?: string): void {
    this.formService.debugForm(this.form, title ?? 'GenericFormService Debug');
  }

  // ── 제출 ───────────────────────────────────────
  submitValue(): T | null {
    if (this.form.invalid) {
      this.markAllTouched();  // ✅ 위임
      return null;
    }
    return this.form.getRawValue() as T;
  }
}
