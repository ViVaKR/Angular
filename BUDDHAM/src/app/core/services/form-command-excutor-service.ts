import { inject, Injectable } from '@angular/core';
import { LoaderService } from '@app/core/services/loader-service';
import { AlertService } from '@app/core/services/alert-service';

type CommandResult<T> =
  | { success: true; data: T; }
  | { success: false; error: any; };

@Injectable({ providedIn: 'root' })
export class FormCommandExcutorService {

  private loader = inject(LoaderService);
  private alert = inject(AlertService);

  /**
   * 비동기 액션 실행
   * @param action - 실행할 비동기 함수
   * @param message - 성공 메시지 (error는 선택)
   * @returns CommandResult
   */
  public async excute<T>(
    action: () => Promise<T>,
    message: { success: string, error?: string }
  ): Promise<CommandResult<T>> {

    this.loader.show();

    try {
      const result = await action();

      this.alert.openSheet([{
        title: message.success,
        success: true
      }]);

      return { success: true, data: result };

    } catch (err: any) {

      // ✅ 커스텀 에러 메시지가 있으면 Interceptor 메시지 덮어쓰기
      if (message.error) {
        this.alert.openSheet([{
          title: message.error,
          content: err?.message || ''
        }]);
      }

      // ✅ 없으면 Interceptor 메시지만 표시 (아무것도 안 함)

      return { success: false, error: message.error };

    } finally {
      this.loader.hide();
    }
  }
}
