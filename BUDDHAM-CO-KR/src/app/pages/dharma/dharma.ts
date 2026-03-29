import { Component, computed, inject } from '@angular/core';
import { IMenuGroup } from '@app/core/interfaces/i-menu-config';
import { MenuService } from '@app/core/services/menu-service';
import { Paths } from '@app/data/menu-data';
import { SharedPage } from "@app/shared/components/shared-page/shared-page";

@Component({
  selector: 'app-dharma',
  imports: [SharedPage],
  templateUrl: './dharma.html',
  styleUrl: './dharma.scss',
})
export class Dharma {

  readonly title = Paths.Dharma.title;
  private menuService = inject(MenuService);

  readonly menuGroups = computed<IMenuGroup[]>(() => [
    {
      title: '성전 聖典',
      icon: this.menuService.folderOpen,
      expanded: true,
      menus: this.menuService.canonMenus()
    },
    {
      title: '법문 法門',
      icon: this.menuService.folderOpen,
      expanded: false,
      menus: this.menuService.passageMenus()
    },
    {
      title: '사경 寫經',
      icon: this.menuService.folderOpen,
      expanded: false,
      menus: this.menuService.sutraCopyingMenus()
    }
  ]);
}
