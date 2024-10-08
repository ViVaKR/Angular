import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingService } from '@app/services/loading.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-loading-indictor',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    AsyncPipe,
    NgIf,
    NgTemplateOutlet,
    MatProgressBarModule
  ],
  templateUrl: './loading-indictor.component.html',
  styleUrl: './loading-indictor.component.scss'
})
export class LoadingIndictorComponent implements OnInit {

  mode: ProgressSpinnerMode = 'determinate';
  loadingService = inject(LoadingService);

  router = inject(Router);

  loading$: Observable<boolean>;

  @Input()
  detectRouteTransitions = false;

  @ContentChild('loading')
  customLoadingIndicator: TemplateRef<any> | null = null;

  ngOnInit(): void {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }

}
