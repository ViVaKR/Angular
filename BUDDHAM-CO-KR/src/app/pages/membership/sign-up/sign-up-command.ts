import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "@app/core/services/alert-service";
import { AuthService } from "@app/core/services/auth-service";
import { LoaderService } from "@app/core/services/loader-service";
import { Paths } from "@app/data/menu-data";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SignUpCommand {

  private readonly auth = inject(AuthService);
  private readonly loader = inject(LoaderService);
  private readonly alert = inject(AlertService);
  private readonly router = inject(Router);
  readonly loading = signal(false);

  async execute(payload: any) {
    if (this.loading()) return; // exhustMap 대체
    this.loading.set(true);
    this.loader.show();
    try {
      const res = await firstValueFrom(this.auth.signUpAndLogin(payload));
      if (res.isSuccess) {
        this.alert.openSheet([{
          title: '회원가입 완료',
          content: res.message
        }]);
        this.router.navigate([Paths.MemberShip.url]);

      }
    } catch (err: any) {
      this.alert.openSheet([{
        title: '회원가입 실패',
        content: err?.error?.message ?? err.message ?? '알 수 없는 오류'
      }]);
    } finally {
      this.loading.set(false);
      this.loader.hide();
    }
  }
}
