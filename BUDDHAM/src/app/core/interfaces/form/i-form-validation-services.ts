import { Observable } from "rxjs";

/**
 * 폼 검증용 서비스의 기본 계약
 */
export interface IFormValidationService {
    validateFormData(formData: any): Observable<{ isValid: boolean; errors?: any }>;
}

/**
 * 계층 구조 검증 기능을 갖춘 서비스
 */
export interface IHierarchyValidationService {
    checkHierarchyConflict(parentId: any, rootId: any): Observable<boolean>;
}

/**
 * 중복 검사 기능을 갖춘 서비스
 */
export interface IDuplicateCheckService {
    checkDuplicate(fieldName: string, value: any): Observable<boolean>;
}

/**
 * 모든 검증 기능을 통합한 서비스
 */
export interface IAsyncValidationService
    extends IFormValidationService,
    IHierarchyValidationService,
    IDuplicateCheckService { }
