import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { UiService } from '@app/core/services/ui-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MenuService } from '@app/core/services/menu-service';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { SharedPage } from "@app/shared/components/shared-page/shared-page";
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { IMenuGroup } from '@app/core/interfaces/i-menu-config';


@Component({
  selector: 'app-membership',
  imports: [
    CommonModule,
    SharedPage,
    ...MATERIAL_COMMON
  ],
  templateUrl: './membership.html',
  styleUrl: './membership.scss',
  host: { 'class': 'route-membership' },
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Membership {

  title = Paths.MemberShip.title;

  private readonly menuService = inject(MenuService);
  private readonly userStore = inject(UserStore);

  private router = inject(Router);
  private uiService = inject(UiService);

  fold = signal(true);

  readonly home = '';

  showLeft = toSignal(this.uiService.showleft$, { initialValue: true });

  // 왼쪽메뉴
  menus = this.menuService.membershipMenus;

  readonly menuGroups = computed<IMenuGroup[]>(() => []);

  // 📊 사용자 상태
  readonly currentUser = this.userStore.currentUser;
  readonly isEmailConformed = this.userStore.isEmailConfirmed;

  // 🔔 뱃지 체크
  shouldShowBadge = (menu: any) => this.menuService.shouldShowBadge(menu);

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  toggleAccordion() {
    if (this.stateFold()) {
      this.accordion.openAll();
    } else {
      this.accordion.closeAll();
    }
  }

  stateFold() {
    this.fold.set(!this.fold());
    return this.fold();
  }

  goTo = (url: string) => this.router.navigate([url]);
}
