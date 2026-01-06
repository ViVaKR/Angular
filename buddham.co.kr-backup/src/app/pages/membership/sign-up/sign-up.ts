import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ReactiveFormsModule,
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormErrorStateMatcher } from '@app/core/classes/form-error-state-matcher';
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from '@app/core/services/auth-service';
import { IValidationError } from '@app/core/interfaces/i-validation-error';
import { MatButtonModule } from "@angular/material/button";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '@app/core/services/loader-service';
import { catchError, EMPTY, exhaustMap, filter, finalize, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UniqueValidators } from '@app/core/classes/unique-validators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Paths } from '@app/data/menu-data';
import { AlertService } from '@app/core/services/alert-service';

@Component({
  selector: 'app-sign-up',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUp {

  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  alertService = inject(AlertService);
  loader = inject(LoaderService);
  router = inject(Router);

  form: FormGroup = this.formBuilder.group({
    fullName: ['', Validators.required],
    pseudonym: ['', [Validators.required],
      [UniqueValidators.createPseudonymValidator(this.authService)] // 필명 검사
    ],
    email: ['', [Validators.required, Validators.email],  // * 동기 검사기
      [UniqueValidators.createEmailValidator(this.authService)] // * 비동기 검사기
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    avatar: ['default.png', Validators.required],
    roles: [['User'], Validators.required]
  }, { validators: this.passwordMatchValidator });


  hidePassword = signal(true);

  // 3. 애러 매처
  matcher = new FormErrorStateMatcher();
  errors: IValidationError[] = [];

  // 4. Submit 처리를 위한 Subject (반응형 스트림의 시작점)
  private submit$ = new Subject<void>();


  constructor() {
    this.loader.hide();

    // 생성자 단계에서 스트림을 정의
    this.submit$.pipe(

      // 1. 폼이 유효할 때만 진행
      filter(() => {
        if (this.form.invalid) {
          this.form.markAllAsTouched(); // 애러 빨간줄 표시
          return false;
        }
        return true;
      }),
      // (2) 로딩 시작
      tap(() => this.loader.show()),

      // (3) exhaustMap 사용
      // 사용자가 버튼을 광클을 해도, 요청이 진행 중이면 추가 클릭을 '무시'함
      // (switchMap은 이전 요청 취소, mergeMap은 다중 요청 허용)
      // 회워 가입은 '중복'되면 안되니까 exhausMap 이 최고!
      exhaustMap(() =>
        this.authService.signUpAndLogin(this.form.getRawValue()).pipe(
          // 에러가 나도 메인 스트림 (submit$)이 죽지 않도록 내부에서 catch
          catchError((err: HttpErrorResponse) => {
            // this.loader.hide();
            this.alertService.openSheet([{
              title: '회원가입 실패',
              content: err.error?.message || err.message || err || '알 수 없는 오류가 발생했습니다.'
            }]);
            return EMPTY; // 메인 스트림은 계속 살려둠
          }),
          finalize(() => this.loader.hide()) // 성공/실패/완료 모두 처리!
        )
      ),
      // (4) 성공 시 처리
      tap((res) => {
        if (res.isSuccess) {
          this.alertService.openSheet([{
            title: '회원가입 완료',
            content: res.message
          }]);
        }
        this.router.navigate([Paths.ConfirmEmail.url]);
      }),

      // (5) takeUntilDestroyed
      // 컴포넌트가 파괴되면 이 구독 스트림을 자동으로 끊어 줌
      // 생성자 컨텍스트 내부라서 인자 없이 사용 가능.
      takeUntilDestroyed()
    ).subscribe(); // 구독시작 (Unsubscribe 는 takeUntilDestroyed 가 함)

  }

  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  /* --- 오류 헬퍼 메서드 --- */
  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName);
    return !!(
      control &&
      control.hasError(error) &&
      (control.dirty || control.touched)
    );
  }

  isGroupError(error: string): boolean {
    return !!(
      this.form.hasError(error) &&
      this.form.get('confirmPassword')?.dirty &&
      this.form.get('confirmPassword')?.touched
    );
  }

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    this.hidePassword.update(v => !v);
  }

  // 라우팅 헬퍼
  goToSignIn = () => this.router.navigate([Paths.SignIn.url]);
  onCancel = () => this.router.navigate([Paths.Home.url])

  onSubmit(event: MouseEvent) {
    // 기본 submit 방지
    event.preventDefault();
    // 우리는 스트림에 '신호'만보냄
    this.submit$.next();
  }
}
