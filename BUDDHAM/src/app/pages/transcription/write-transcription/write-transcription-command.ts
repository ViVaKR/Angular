import { inject, Injectable, signal } from '@angular/core';
import { IScriptureContentCreate } from '@app/core/interfaces/i-scripture-content-create';
import { AlertService } from '@app/core/services/alert-service';
import { LoaderService } from '@app/core/services/loader-service';
import { TranscriptionService } from '@app/core/services/transcription-service';

@Injectable({ providedIn: 'root', })
export class WriteTranscriptionCommand {

  private readonly service = inject(TranscriptionService);
  private readonly loader = inject(LoaderService);
  private readonly alert = inject(AlertService);
  private readonly loading = signal(false);

  async excute(payload: IScriptureContentCreate) {
    if (this.loading()) return;
    this.loading.set(true);
    this.loader.show();
    try {
      const res = await this.service.contentCreate(payload);
      this.alert.openSheet([{ title: `(${res.rsCode} 저장완료)`, content: `${res.rsMessage}` }]);
    } catch (err: any) {
      this.alert.openSheet([{ title: '저장실패', content: `${err?.message}` }]);
    } finally {
      this.loading.set(false);
      this.loader.hide();
    }
  }
}
