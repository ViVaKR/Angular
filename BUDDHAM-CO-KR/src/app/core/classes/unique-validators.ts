import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { AuthService } from "@app/core/services/auth-service";
import { catchError, first, map, Observable, of, switchMap, timer } from "rxjs";

export class UniqueValidators {

  // 이메일 중복 검사기 (Static Factory Method)
  static createEmailValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // 값이 없으면 검사 안 함 (통과)
      if (!control.value) {
        return of(null);
      }

      return timer(500).pipe( // (1) 0.5 초 디바운스 (타자 칠 땐 기다림
        switchMap(() => authService.checkEmail(control.value)), // (2) API 호출
        map((isTaken) => {
          // (3) 결과 처리: true 면 (이미 있음) 에러 리턴, false 면 null (통과)
          return isTaken ? { emailTaken: true } : null;
        }),
        catchError(() => of(null)), // 에러나면 일단 통과 시킴 (UX상 방해 안되게)
        first() // (4) 중요: 반드시 완료 (Complete) 되어야 폼 상태가 확정됨
      );
    };
  }

  // * 필명 중복 검사기 (회원가입 용)
  static createPseudonymValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      return timer(500).pipe(
        switchMap(() => authService.checkPseudonym(control.value)),
        map(isTaken => isTaken ? { pseudonymTaken: true } : null),
        catchError(() => of(null)),
        first()
      );
    };
  }

  static createPseudonymAuthValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      return timer(500).pipe(
        switchMap(() => authService.checkPseudonymAuth(control.value)),
        map(isTaken => isTaken ? { pseudonymTaken: true } : null),
        catchError(() => of(null)),
        first()
      )
    }
  }
}
