import { inject, Injectable } from '@angular/core';
import { LoaderService } from './loader-service';
import { SnackbarService } from './snackbar-service';

type CommandResult<T> = { success: true; data: T; } | { success: false; error: any; }

@Injectable({ providedIn: 'root' })
export class FormCommandExcutorService {
  private loader = inject(LoaderService);
  private snackBar = inject(SnackbarService);
  public async excute<T>(action: () => Promise<T>, message: { success: string, error: string })
    : Promise<CommandResult<T>> {
    this.loader.show();
    try {
      const result = await action();
      this.snackBar.success("저장 완료");
      return { success: true, data: result };
    } catch (err: any) {
      this.snackBar.error(`${message.error} - ${err?.message}`)
      return { success: false, error: err };
    } finally {
      this.loader.hide();
    }
  }
}
