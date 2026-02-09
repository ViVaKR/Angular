import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderService } from '@core/services/loader-service';
import { Loading } from "./shared/components/loading/loading";
import { Footer } from "./shared/footer/footer";
import { AsyncPipe } from '@angular/common';
import { Menus } from './shared/menus/menus';
import { UiService } from './core/services/ui-service';
import { MatIconModule } from "@angular/material/icon";
import { MatBottomSheetModule, } from '@angular/material/bottom-sheet';
import { filter } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
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
  animations: []
})
export class App implements OnInit {

  private loader = inject(LoaderService);
  private uiService = inject(UiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading = this.loader.loading$;
  showbar = this.uiService.showbar$;

  show = signal(false);

  ngOnInit(): void {

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
