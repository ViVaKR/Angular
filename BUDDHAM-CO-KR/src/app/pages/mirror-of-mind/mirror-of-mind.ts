import { Component, inject } from '@angular/core';
import { MenuService } from '@app/core/services/menu-service';
import { SharedPage } from "@app/shared/components/shared-page/shared-page";

@Component({
  selector: 'app-mirror-of-mind',
  imports: [SharedPage],
  templateUrl: './mirror-of-mind.html',
  styleUrl: './mirror-of-mind.scss',
})
export class MirrorOfMind {
  title = '마음의 거울'
  menuService = inject(MenuService);
  menus = this.menuService.mirrorOfMindMenus();
}
