import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { IConfirmEmailReply } from '@app/core/interfaces/i-confirm-email-reply';
import { Paths } from '@app/data/menu-data';
import { PageTitle } from "@app/shared/components/page-title/page-title";
import { MatAnchor } from "@angular/material/button";
import { SnackbarService } from '@app/core/services/snackbar-service';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '@app/core/services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatError } from "@angular/material/form-field";

@Component({
  selector: 'app-confirm-email-reply',
  imports: [PageTitle, MatAnchor, MatError],
  templateUrl: './confirm-email-reply.html',
  styleUrl: './confirm-email-reply.scss',
})
export class ConfirmEmailReply {

  readonly title = Paths.ConfirmEmailReply.title;

  reply = {} as IConfirmEmailReply;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(SnackbarService);
  private authService = inject(AuthService);

  private params = toSignal(this.route.queryParamMap);

  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);

  constructor() {
    this.reply.email = this.params()?.get('email') ?? '-';
    this.reply.token = this.params()?.get('token') ?? '-';
  }

  async onReply(): Promise<void> {
    if (this.reply?.email == null || this.reply?.token == null) {
      this.snackBar.error('전송할 데이터가 비어 있습니다.');
    }

    try {
      const response = await lastValueFrom(
        this.authService.confirmEmailReply(this.reply)
      );

      this.snackBar.success(response.rsMessage);
    } catch (err: unknown) {

      const errorMessage = err instanceof HttpErrorResponse
        ? err.error?.rsMessage || err.message
        : '이메일 전송에 실패 했습니다.';

      this.submitError.set(errorMessage);
      this.snackBar.error(errorMessage);

    } finally {
      this.isSubmitting.set(false);
      this.router.navigate(['/Home']);
    }

  }
}
