import { afterNextRender, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderService } from '@core/services/loader-service';
import { Loading } from "./shared/components/loading/loading";
import { Footer } from "./shared/footer/footer";
import { AsyncPipe } from '@angular/common';
import { Menus } from './shared/menus/menus';
import { UiService } from './core/services/ui-service';
import { MatIconModule } from "@angular/material/icon";

import {
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { filter, firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { TokenStorage } from './core/services/token-storage';
import { AuthService } from './core/services/auth-service';
import { AuthStore } from './core/services/auth-store';
import { UserStore } from './core/services/user-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    Menus,
    Loading,
    Footer,
    AsyncPipe,
    MatIconModule,
    MatBottomSheetModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  private tokenStorage = inject(TokenStorage);
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private userStore = inject(UserStore);

  private loader = inject(LoaderService);
  private uiService = inject(UiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading = this.loader.loading$;
  showbar = this.uiService.showbar$;
  show = signal(false);
  ngOnInit(): void {
    console.log('🏋️‍♂️ App.ngOnInit 시작');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRouteData();
    });
  }

  private checkRouteData() {
    let route = this.route;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const showBar = route.snapshot.data['showBar'] ?? false;

    if (showBar) {
      this.uiService.showbar();
    } else {
      this.uiService.hidebar();
    }
  }

  toggleMenu() {
    this.show.update(v => !v);
    this.uiService.toggleLeft();
  }
}
