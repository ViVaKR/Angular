import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PageTitle } from "@app/shared/components/page-title/page-title";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { DatePipe } from '@angular/common';
import { environment } from '@env/environment.development';
import { IConfirmEmail } from '@app/core/interfaces/i-confirm-email';
import { AuthService } from '@app/core/services/auth-service';
import { SnackbarService } from '@app/core/services/snackbar-service';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Paths } from '@app/data/menu-data';
import { UserStore } from '@app/core/services/user-store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-confirm-email',
  imports: [
    PageTitle,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAnchor,
    MatButtonModule,
  ],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePipe, { provide: 'LOCALE_ID', useValue: 'ko_KR' }
  ]
})
export class ConfirmEmail {

  readonly title = Paths.ConfirmEmail.title;
  dataPipe = inject(DatePipe);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(SnackbarService);
  private userStore = inject(UserStore);
  userInfo = toSignal(this.userStore.user$, { initialValue: null });
  private replyUrl = environment.emailReplyUrl;

  readonly form = this.fb.group({
    email: this.fb.control({ value: '', disabled: true }, {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    replyUrl: this.fb.control(this.replyUrl, {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  get emailControl() {
    return this.form.controls.email;
  }
  // Signal 로 상태 관리
  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);

  constructor() {

    this.form.patchValue({
      email: this.userInfo()?.email || '',
      replyUrl: this.replyUrl
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    try {
      const data: IConfirmEmail = this.form.getRawValue();
      const response = await lastValueFrom(
        this.authService.confirmSendEmail(data)
      );

      this.snackBar.success(response.rsMessage);
      this.form.reset();

    } catch (error) {
      const errorMessage = error instanceof HttpErrorResponse
        ? error.error?.rsMessage || error.message
        : '이메일 전송에 실패했습니다.';

      this.submitError.set(errorMessage);
      this.snackBar.error(errorMessage);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
