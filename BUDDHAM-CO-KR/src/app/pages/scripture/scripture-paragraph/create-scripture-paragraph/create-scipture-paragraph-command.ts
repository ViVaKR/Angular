import { inject, Injectable, signal } from '@angular/core';
import { IScriptureParagraph } from '@app/core/interfaces/i-scripture-paragraph';
import { AlertService } from '@app/core/services/alert-service';
import { LoaderService } from '@app/core/services/loader-service';
import { ScriptureService } from '@app/core/services/scripture-service';

@Injectable({ providedIn: 'root' })
export class CreateSciptureParagraphCommand {
  private readonly scriptureService = inject(ScriptureService);
  private readonly loader = inject(LoaderService);
  private readonly alert = inject(AlertService);

  private readonly loading = signal(false);

  async excute(payload: IScriptureParagraph, id?: number) {
    if (this.loading()) return;

    this.loading.set(true);
    this.loader.show();

    try {
      // * 서비스에서 처리
      const res = await this.scriptureService.paragraphCreateOrUpdate(payload, id);

      this.alert.openSheet([{
        title: `(${res.rsCode}) 경전 쓰기 완료`,
        content: `${res.rsMessage}`
      }]);

    } catch (err: any) {

      this.alert.openSheet([{
        title: `경전 쓰기 실패`,
        content: `${err?.message}`
      }]);

    } finally {
      this.loading.set(false);
      this.loader.hide();
    }
  }
}
