import { AfterViewInit, Component, inject, isDevMode, OnInit, ViewChild } from '@angular/core';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { BibleService } from '@app/services/bible.service';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatMenuModule,
    MatIconModule,
    NgIf,
    NgFor,
    JsonPipe,
    MatTooltipModule
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  title = "Bible"

  router = inject(Router);

  goToLink(url: string, id: number | null) {
    if (id === null) {
      this.router.navigate([url]);
    } else {
      this.router.navigate([url], {
        queryParams: { id: id }
      });
    }
  }

}
