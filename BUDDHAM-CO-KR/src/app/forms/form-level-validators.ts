import { AbstractControl, ValidationErrors } from "@angular/forms";
import { FormValidatorFn } from "@app/core/interfaces/form/i-form-config";

export class FormLevelValidators {

    /**
     * 기본 Validator: parentId가 있으면 rootId도 있어야 함
     */
    static hierarchyValidator(): FormValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const rootId = group.get('rootId')?.value;
            const parentId = group.get('parentId')?.value;

            if (parentId && !rootId) {
                return {
                    'invalidHierarchy': {
                        message: 'parentId가 있으면 rootId도 필수입니다',
                        requiredField: 'rootId'
                    }
                };
            }

            return null;
        };
    }

    /**
     * 기본 Validator: 최대 계층 깊이 제한
     */
    static maxHierarchyDepthValidator(maxDepth: number = 5): FormValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const rootId = group.get('rootId')?.value;
            const parentId = group.get('parentId')?.value;

            // 실제로는 DB에서 깊이를 계산해야 함
            // 여기서는 간단한 검증만
            if (parentId && maxDepth <= 0) {
                return {
                    'maxHierarchyDepth': {
                        message: `최대 ${maxDepth}단계까지만 허용됩니다`,
                        maxDepth
                    }
                };
            }

            return null;
        };
    }

    /**
     * 기본 Validator: 날짜 범위 검증
     */
    static dateRangeValidator(): FormValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const startDate = group.get('period')?.value;
            const endDate = group.get('translationPeriod')?.value;

            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);

                if (start > end) {
                    return {
                        'invalidDateRange': {
                            message: '시작 날짜가 종료 날짜보다 클 수 없습니다',
                            start: startDate,
                            end: endDate
                        }
                    };
                }
            }

            return null;
        };
    }

    /**
     * 기본 Validator: 필드 간 충돌 검증
     */
    static conflictingFieldsValidator(
        field1: string,
        field2: string,
        allowBoth: boolean = false
    ): FormValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const value1 = group.get(field1)?.value;
            const value2 = group.get(field2)?.value;

            const has1 = value1 && (typeof value1 === 'string' ? value1.trim() : value1);
            const has2 = value2 && (typeof value2 === 'string' ? value2.trim() : value2);

            // 둘 다 있을 수 없음
            if (!allowBoth && has1 && has2) {
                return {
                    'conflictingFields': {
                        message: `${field1}와 ${field2}는 동시에 설정할 수 없습니다`,
                        conflictFields: [field1, field2]
                    }
                };
            }

            // 최소 하나는 있어야 함
            if (!has1 && !has2) {
                return {
                    'missingConditionalField': {
                        message: `${field1} 또는 ${field2} 중 최소 하나는 필수입니다`,
                        requiredFields: [field1, field2]
                    }
                };
            }

            return null;
        };
    }

    /**
     * 기본 Validator: 조건부 필수 필드
     */
    static conditionalRequiredValidator(
        dependentField: string,
        requiredFields: string[],
        condition: (value: any) => boolean
    ): FormValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const dependentValue = group.get(dependentField)?.value;

            if (condition(dependentValue)) {
                const missingFields = requiredFields.filter(field => {
                    const fieldValue = group.get(field)?.value;
                    return !fieldValue || (typeof fieldValue === 'string' && !fieldValue.trim());
                });

                if (missingFields.length > 0) {
                    return {
                        'conditionalRequired': {
                            message: `${dependentField}이 ${dependentValue}일 때, ${missingFields.join(', ')}는 필수입니다`,
                            dependentField,
                            missingFields
                        }
                    };
                }
            }

            return null;
        };
    }

    /**
     * 기본 Validator: 상호배타적 필드 (둘 중 하나만 선택)
     */
    static mutuallyExclusiveValidator(...fieldNames: string[]): FormValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const filledFields = fieldNames.filter(field => {
                const value = group.get(field)?.value;
                return value && (typeof value === 'string' ? value.trim() : value);
            });

            if (filledFields.length > 1) {
                return {
                    'mutuallyExclusive': {
                        message: `${fieldNames.join(', ')} 중 하나만 선택할 수 있습니다`,
                        filledFields,
                        allowedCount: 1
                    }
                };
            }

            return null;
        };
    }
}
