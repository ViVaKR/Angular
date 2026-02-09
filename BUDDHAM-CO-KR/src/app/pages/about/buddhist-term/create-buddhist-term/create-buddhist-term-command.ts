import { inject, Injectable, signal } from '@angular/core';
import { IBuddhistTerm } from '@app/core/interfaces/i-buddhist-term';
import { AboutService } from '@app/core/services/about-service';
import { AlertService } from '@app/core/services/alert-service';
import { LoaderService } from '@app/core/services/loader-service';

@Injectable({
  providedIn: 'root',
})
export class CreateBuddhistTermCommand {

  private readonly aboutService = inject(AboutService);
  private readonly loader = inject(LoaderService);
  private readonly alert = inject(AlertService);
  private readonly loading = signal(false);

  async excute(payload: IBuddhistTerm) {

    if (this.loading()) return;

    this.loading.set(true);
    this.loader.show();

    try {
      const res = await this.aboutService.termCreate(payload);
      this.alert.openSheet([{
        title: `(${res.rsCode}) 저장 완료`,
        content: `${res.rsMessage}`
      }]);
    } catch (err: any) {
      this.alert.openSheet([{
        title: `저장 실패`,
        content: `${err?.message}`
      }]);
    } finally {
      this.loading.set(false);
      this.loader.hide();
    }
  }
}
