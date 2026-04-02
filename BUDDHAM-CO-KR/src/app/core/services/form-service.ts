import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IFormConfig } from '@app/core/interfaces/form/i-form-config';
import { debounceTime, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormService {

  private readonly fb = inject(FormBuilder);

  /**
   * 제너릭 폼 생성 (disabled, 동기/비동기 validator 완전 지원)
   */
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

  /**
   * 필드 에러 확인
   * touched 상태 확인
   */
  hasError(form: FormGroup, fieldName: string, errorType: string): boolean {
    const control = form.get(fieldName);
    return !!(control?.hasError(errorType) && control?.touched);
  }

  /**
   * 필드의 모든 에러 가져오기
   */
  getFieldErrors(form: FormGroup, fieldName: string): ValidationErrors | null {
    const control = form.get(fieldName);
    return control?.errors || null;
  }
  /**
    * 필드 에러 메시지 생성
    */
  getFieldErrorMessage(form: FormGroup, fieldName: string): string {
    const control = form.get(fieldName);
    const errors = control?.errors;

    if (!errors) return '';

    // 첫 번째 에러 메시지 반환
    const errorKey = Object.keys(errors)[0];
    const error = errors[errorKey];

    switch (errorKey) {
      case 'required':
        return `${fieldName}은(는) 필수 입력값입니다`;
      case 'minlength':
        return `${fieldName}은(는) 최소 ${error.requiredLength}자 이상이어야 합니다`;
      case 'maxlength':
        return `${fieldName}은(는) 최대 ${error.requiredLength}자 이하여야 합니다`;
      case 'min':
        return `${fieldName}은(는) ${error.min} 이상이어야 합니다`;
      case 'max':
        return `${fieldName}은(는) ${error.max} 이하여야 합니다`;
      case 'pattern':
        return `${fieldName}은(는) 올바른 형식이 아닙니다`;
      case 'email':
        return `${fieldName}은(는) 유효한 이메일이 아닙니다`;
      default:
        // 커스텀 에러 메시지
        if (typeof error === 'object' && error.message) {
          return error.message;
        }
        return `${fieldName} 검증 실패: ${errorKey}`;
    }
  }

  /**
   * 폼 레벨 에러 확인
   */
  hasFormError(form: FormGroup, errorKey: string): boolean {
    return form.hasError(errorKey);
  }

  /** 폼 레벨 에러 가져오기 */
  getFormErrors(form: FormGroup): ValidationErrors | null {
    return form.errors;
  }

  /** 폼 레벨 에러 메시지 생성 */
  getFormErrorMessage(form: FormGroup, errorKey: string): string {
    const error = form.errors?.[errorKey];

    if (!error) return '';

    // 커스텀 에러 객체에서 메시지 추출
    if (typeof error === 'object' && error.message) {
      return error.message;
    }

    return `폼 검증 실패: ${errorKey}`;
  }

  /** 특정 필드가 폼 레베 에러로 영향을 받는지 확인 */
  isFieldAffectedByFormError(form: FormGroup, fieldName: string): boolean {
    const errors = form.errors;
    if (!errors) return false;

    return Object.values(errors).some(err => {
      if (typeof err === 'object') {
        return err['conflictFields']?.includes(fieldName) ||
          err['missingFields']?.includes(fieldName) ||
          err['filledFields']?.includes(fieldName) ||
          err['requiredFields']?.includes(fieldName) ||
          err['affectedFields']?.includes(fieldName);
      }
      return false;
    });
  }

  /** 필드가 비동기 검증 중인지 확인 */
  isFieldPending(form: FormGroup, fieldName: string): boolean {
    return form.get(fieldName)?.pending || false;
  }

  /** 필드 값 가져오기 */
  getFieldValue(form: FormGroup, fieldName: string): any {
    return form.get(fieldName)?.value;
  }

  /** 필드 값 설정 */
  setFieldValue(form: FormGroup, fieldName: string, value: any): void {
    const control = form.get(fieldName);

    if (control) {
      control.setValue(value);
      control.markAsDirty();
      control.markAsTouched();
    }
  }

  /** 여러 필드 활성화/비활성화 */
  enableField(form: FormGroup, fieldName: string, enable: boolean = true): void {
    const control = form.get(fieldName);
    enable ? control?.enable() : control?.disable();
  }

  /** 필드 표시/숨김 (UI 레벨) */
  showField(form: FormGroup, fieldName: string, show: boolean = true): void {
    const control = form.get(fieldName);
    show ? control?.enable() : control?.disable();
  }
  /** 단순 폼 리셋 (1단계) */
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

  /**
   * 깊은 폼 리셋
   * nested FormGroup 포함
   */
  deepResetForm(formGroup: FormGroup, value?: any): void {

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

  /** 폼을 설정값으로 리셋 (disabled 상태 복원) */
  resetFormWithConfig(form: FormGroup, config: IFormConfig, value?: any): void {

    this.resetForm(form, value);

    // disabled 상태 복원
    config.fields.forEach(field => {
      const control = form.get(field.name);
      if (control && field.disabled) {
        control.disable({ emitEvent: false });
      } else if (control && !field.disabled) {
        control.enable({ emitEvent: false });
      }
    });

    form.updateValueAndValidity({ emitEvent: false });
  }

  /** 폼 데이터 검증 상태 확인 */
  isFormValid(form: FormGroup): boolean {
    return form.valid;
  }

  /** 폼의 모든 필드가 touched 상태인지 확인 */
  isFormTouched(form: FormGroup): boolean {
    return Object.keys(form.controls).every(key => {
      const control = form.get(key);
      return control?.touched;
    });
  }

  /** 폼의 모든 필드를 touched 상태로 마크 */
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

  /**
    * 폼의 모든 필드를 dirty 상태로 마크
    */
  markFormGroupDirty(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup) {
        this.markFormGroupDirty(control);
      } else {
        control?.markAsDirty({ onlySelf: true });
      }
    });
  }

  /**
   * 특정 필드만 검증 (다른 필드는 무시)
   */
  validateField(form: FormGroup, fieldName: string): boolean {
    const control = form.get(fieldName);
    if (control) {
      control.markAsTouched();
      control.updateValueAndValidity();
      return control.valid;
    }
    return false;
  }
  /**
     * 여러 필드만 검증
     */
  validateFields(form: FormGroup, fieldNames: string[]): boolean {
    return fieldNames.every(fieldName => this.validateField(form, fieldName));
  }

  /**
   * 폼 값을 RawValue로 가져오기 (disabled 필드 포함)
   */
  getFormRawValue(form: FormGroup): any {
    return form.getRawValue();
  }

  /**
   * 폼 값을 Value로 가져오기 (disabled 필드 제외)
   */
  getFormValue(form: FormGroup): any {
    return form.value;
  }

  /**
   * 폼이 변경되었는지 확인
   */
  isFormChanged(form: FormGroup): boolean {
    return form.dirty || form.touched;
  }

  /**
   * 두 폼 값 비교
   */
  compareFormValues(value1: any, value2: any): boolean {
    return JSON.stringify(value1) === JSON.stringify(value2);
  }

  /**
   * 폼 상태를 상세 정보로 가져오기
   */
  getFormStatus(form: FormGroup): {
    valid: boolean;
    pending: boolean;
    touched: boolean;
    dirty: boolean;
    errors: ValidationErrors | null;
    fieldStatuses: any[];
  } {
    const fieldStatuses = Object.keys(form.controls).map(key => ({
      name: key,
      valid: form.get(key)?.valid,
      pending: form.get(key)?.pending,
      touched: form.get(key)?.touched,
      dirty: form.get(key)?.dirty,
      errors: form.get(key)?.errors,
      value: form.get(key)?.value,
      disabled: form.get(key)?.disabled
    }));

    return {
      valid: form.valid,
      pending: form.pending,
      touched: form.touched,
      dirty: form.dirty,
      errors: form.errors,
      fieldStatuses
    };
  }

  /**
   * 폼 디버깅 (콘솔에 상세 정보 출력)
   */
  debugForm(form: FormGroup, title: string = 'Form Debug'): void {
    const status = this.getFormStatus(form);
    console.group(title);
    console.log('Form Status:', status);
    console.table(status.fieldStatuses);
    console.groupEnd();
  }

  /**
   * 폼의 변경 사항 감시 (디바운스 포함)
   */
  watchFormChanges(
    form: FormGroup,
    debounceMs: number = 300
  ): Observable<any> {
    return form.valueChanges.pipe(
      debounceTime(debounceMs)
    );
  }

  /**
   * 특정 필드의 변경 감시
   */
  watchFieldChanges(
    form: FormGroup,
    fieldName: string,
    debounceMs: number = 300
  ): Observable<any> {
    const control = form.get(fieldName);
    if (!control) {
      return of(null);
    }

    return control.valueChanges.pipe(
      debounceTime(debounceMs)
    );
  }

  /**
   * 조건부 validator 활성화/비활성화
   */
  setConditionalValidator(
    form: FormGroup,
    fieldName: string,
    validators: ValidatorFn[] | ValidatorFn,
    condition: boolean
  ): void {
    const control = form.get(fieldName);
    if (control) {
      if (condition) {
        control.setValidators(validators);
      } else {
        control.clearValidators();
      }
      control.updateValueAndValidity();
    }
  }

  /**
   * 폼 상태 스냅샷 저장
   */
  saveFormSnapshot(form: FormGroup): any {
    return {
      value: form.getRawValue(),
      status: form.status,
      valid: form.valid,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * 저장된 스냅샷으로 폼 복원
   */
  restoreFormSnapshot(form: FormGroup, snapshot: any): void {
    form.patchValue(snapshot.value);
    form.updateValueAndValidity();
  }
}
