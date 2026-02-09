import { inject, Injectable, signal } from "@angular/core";
import { RsCode } from "@app/core/enums/rs-code";
import { IRole } from "@app/core/interfaces/i-role";
import { AlertService } from "@app/core/services/alert-service";
import { LoaderService } from "@app/core/services/loader-service";
import { RoleService } from "@app/core/services/role-service";

@Injectable({ providedIn: 'root' })
export class CreateRoleCommand {

  private readonly roleService = inject(RoleService);
  private readonly loader = inject(LoaderService);
  private readonly alert = inject(AlertService);

  readonly loading = signal(false);

  async deleteRole(id: string) {
    if (this.loading()) return;

    this.loading.set(true);
    this.loader.show();

    try {
      const res = await this.roleService.deleteRole(id);
      if (res.rsCode === RsCode.Ok) {
        this.alert.openSheet([{
          title: `역할 삭제 완료 ${res.rsMessage}`,
          content: `${res.rsCode}`
        }]);
      } else {
        this.alert.openSheet([{
          title: `역할 삭제 실패  ${res.rsMessage}`,
          content: `${res.rsCode}`
        }]);
      }

    } catch (err: any) {
      this.alert.openSheet([{
        title: `역할 삭제 실패  ${err.message}`,
        content: err?.error?.message ?? err.message ?? '삭제 중 알 수 없는 오류'
      }]);
    } finally {
      this.loading.set(false);
      this.loader.hide();
    }

  }
  async execute(role: IRole, id: string = '') {

    if (this.loading()) return;

    this.loading.set(true);
    this.loader.show();

    try {
      const res = (id == null || id == '')
        ? await this.roleService.createOrUpdateRole(role)
        : await this.roleService.createOrUpdateRole(role, id);
      if (res.rsCode === RsCode.Ok) {
        this.alert.openSheet([{
          title: `역할 ${(id == null || id == '') ? '생성' : '수정'} 완료 ${res.rsMessage}`,
          content: `${res.rsCode}`
        }]);
      } else {
        this.alert.openSheet([{
          title: `역할 ${(id == null || id == '') ? '생성' : '수정'} 실패  ${res.rsMessage}`,
          content: `${res.rsCode}`
        }]);
      }

    } catch (err: any) {
      this.alert.openSheet([{
        title: `역할 ${(id == null || id == '') ? '생성' : '수정'} 실패  ${err.message}`,
        content: err?.error?.message ?? err.message ?? '알 수 없는 오류'
      }]);
    } finally {
      this.loading.set(false);
      this.loader.hide();
    }
  }
}
