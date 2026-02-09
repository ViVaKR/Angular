import { inject, Injectable } from '@angular/core';
import { LoaderService } from './loader-service';
import { AlertService } from './alert-service';

@Injectable({ providedIn: 'root' })
export class FormCommandExcutorService {
  private loader = inject(LoaderService);
  private alert = inject(AlertService);

  public async excute<T>(
    action: () => Promise<T>,
    message: { success: string, error: string }
  ): Promise<T | null> {

    this.loader.show();

    try {
      const result = await action();
      this.alert.openSheet([{
        title: message.success
      }]);
      return result;
    } catch (err: any) {

      this.alert.openSheet([{
        title: message.error,
        content: '알수없는 올류가 발생했습니다.'
      }])
      return null;
    } finally {
      this.loader.hide();
    }
  }
}
