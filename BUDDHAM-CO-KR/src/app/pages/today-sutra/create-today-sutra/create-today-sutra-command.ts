import { inject, Injectable, signal } from "@angular/core";
import { LoaderService } from "@app/core/services/loader-service";
import { AlertService } from "@app/core/services/alert-service";
import { ITodaySutraCreate } from "@app/core/interfaces/i-today-sutra-create";
import { TodaySutraService } from "@app/core/services/today-sutra-service";
import { RsCode } from "@app/core/enums/rs-code";

@Injectable({ providedIn: 'root' })
export class CreateTodaySutraCommand {

  private readonly todaySutraService = inject(TodaySutraService);
  private readonly loader = inject(LoaderService);
  private readonly alert = inject(AlertService);

  private readonly loading = signal(false);

  async excute(payload: ITodaySutraCreate, id?: number) {
    if (this.loading()) return;

    this.loading.set(true);
    this.loader.show();

    try {
      // * 서비스에서 처리
      const res = await this.todaySutraService.createOrUpdate(payload, id);

      if (res.rsCode === RsCode.Ok) {
        this.alert.openSheet([{
          title: `(${res.rsCode}) 오늘의 경전쓰기 완료 ${res.rsMessage}`,
          content: `${res.rsMessage}`
        }]);
      } else {
        this.alert.openSheet([{
          title: `${res.rsMessage}`,
          content: `${res.rsCode}`
        }]);
      }
    } catch (err) {
      this.alert.openSheet([{
        title: `오늘의 경전쓰기 실패`,
        content: `알 수 없는 오류 ${err}`
      }]);
    } finally {
      this.loading.set(false);
      this.loader.hide();
    }
  }
}
