import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AsyncFormValidatorFn } from '@app/core/interfaces/form/i-form-config';
import { IAsyncValidationService, IDuplicateCheckService, IFormValidationService, IHierarchyValidationService } from '@app/core/interfaces/form/i-form-validation-services';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

/**
 * 제너릭 비동기 폼 레벨 validator
 */
export class AsyncFormLevelValidators<T extends IAsyncValidationService> {

    /**
     * 서버에서 전체 폼 데이터 검증
     * @param service - IFormValidationService를 구현한 서비스
     */
    static formDataValidator<S extends IFormValidationService>(
        service: S
    ): AsyncFormValidatorFn {
        return (group: AbstractControl): Observable<ValidationErrors | null> => {
            return timer(500).pipe(
                switchMap(() => {
                    const formData = group.getRawValue();
                    return service.validateFormData(formData);
                }),
                map(result => (result.isValid ? null : { 'serverValidation': result.errors })),
                catchError((error) => {
                    console.error('Form validation error:', error);
                    return of(null);
                })
            );
        };
    }

    /**
     * 계층 구조 중복 검사
     * @param service - IHierarchyValidationService를 구현한 서비스
     */
    static hierarchyConflictValidator<S extends IHierarchyValidationService>(
        service: S
    ): AsyncFormValidatorFn {
        return (group: AbstractControl): Observable<ValidationErrors | null> => {
            const parentId = group.get('parentId')?.value;
            const rootId = group.get('rootId')?.value;

            if (!parentId && !rootId) {
                return of(null);
            }

            return timer(500).pipe(
                switchMap(() => service.checkHierarchyConflict(parentId, rootId)),
                map(hasConflict => {
                    if (hasConflict) {
                        return {
                            'hierarchyConflict': {
                                message: '계층 구조에 충돌이 있습니다',
                                parentId,
                                rootId
                            }
                        };
                    }
                    return null;
                }),
                catchError((error) => {
                    console.error('Hierarchy conflict check error:', error);
                    return of(null);
                })
            );
        };
    }

    /**
     * 단일 필드 중복 검사 (필드 레벨)
     * @param service - IDuplicateCheckService를 구현한 서비스
     * @param fieldName - 검사할 필드명
     */
    static duplicateCheckValidator<S extends IDuplicateCheckService>(
        service: S,
        fieldName: string
    ): AsyncFormValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value || (typeof control.value === 'string' && !control.value.trim())) {
                return of(null);
            }

            return timer(500).pipe(
                switchMap(() => service.checkDuplicate(fieldName, control.value)),
                map(isDuplicate => {
                    if (isDuplicate) {
                        return {
                            'duplicate': {
                                message: `${fieldName}이(가) 이미 존재합니다`,
                                fieldName,
                                value: control.value
                            }
                        };
                    }
                    return null;
                }),
                catchError((error) => {
                    console.error('Duplicate check error:', error);
                    return of(null);
                })
            );
        };
    }
}

/**
 * 비동기 필드 레벨 validator 모음
 */
export class AsyncFieldLevelValidators<T extends IAsyncValidationService> {

    /**
     * Title 중복 검사
     */
    static titleDuplicateValidator<S extends IDuplicateCheckService>(
        service: S
    ): AsyncFormValidatorFn {
        return AsyncFormLevelValidators.duplicateCheckValidator(service, 'title');
    }

    /**
     * Username 중복 검사
     */
    static usernameDuplicateValidator<S extends IDuplicateCheckService>(
        service: S
    ): AsyncFormValidatorFn {
        return AsyncFormLevelValidators.duplicateCheckValidator(service, 'pseudonym');
    }

    /**
     * Email 존재 여부 확인
     */
    static emailExistsValidator<S extends IDuplicateCheckService>(
        service: S
    ): AsyncFormValidatorFn {
        return AsyncFormLevelValidators.duplicateCheckValidator(service, 'email');
    }

    /**
     * 커스텀 필드 중복 검사
     */
    static customDuplicateValidator<S extends IDuplicateCheckService>(
        service: S,
        fieldName: string,
        errorMessage?: string
    ): AsyncFormValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value || (typeof control.value === 'string' && !control.value.trim())) {
                return of(null);
            }

            return timer(500).pipe(
                switchMap(() => service.checkDuplicate(fieldName, control.value)),
                map(isDuplicate => {
                    if (isDuplicate) {
                        return {
                            'duplicate': {
                                message: errorMessage || `${fieldName}이(가) 이미 존재합니다`,
                                fieldName,
                                value: control.value
                            }
                        };
                    }
                    return null;
                }),
                catchError((error) => {
                    console.error(`Duplicate check error for ${fieldName}:`, error);
                    return of(null);
                })
            );
        };
    }
}
