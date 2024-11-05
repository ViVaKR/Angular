import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingService } from '@app/services/loading.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent implements OnInit {

  loadingService = inject(LoadingService);
  router = inject(Router);
  @Input() detectRouteTransitions = false;

  @ContentChild('loading')
  customLoadingIndicator: TemplateRef<any> | null = null;


  loading$: Observable<boolean> = this.loadingService.loading$;

  constructor() {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    if (this.detectRouteTransitions) {
      this.router.events.pipe(
        tap((event) => {
          if (event instanceof RouteConfigLoadStart) {
            this.loadingService.loadingOn();
          } else if (event instanceof RouteConfigLoadEnd) {
            this.loadingService.loadingOff();
          }
        })
      ).subscribe();
    }
  }

}
