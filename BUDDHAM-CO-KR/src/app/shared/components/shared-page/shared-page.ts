import { Component, inject, input, signal } from '@angular/core';
import { RouterLinkWithHref, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UiService } from '@app/core/services/ui-service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { IMenu } from '@app/core/interfaces/i-menu';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';

@Component({
  selector: 'shared-page',
  imports: [
    RouterLinkWithHref,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    MATERIAL_COMMON
  ],
  templateUrl: './shared-page.html',
  styleUrl: './shared-page.scss'
})
export class SharedPage {
  title = input<string>('메뉴');
  menus = input.required<IMenu[]>();
  uiService = inject(UiService);
  showLeft = toSignal(this.uiService.showleft$, { initialValue: false });
  enterClass = signal('enter-animation');
}
