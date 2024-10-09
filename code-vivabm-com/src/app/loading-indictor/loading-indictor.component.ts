import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { CodeService } from '@app/services/code.service';
import { LoadingService } from '@app/services/loading.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    AsyncPipe,
    NgIf,
    NgTemplateOutlet,
    MatProgressBarModule
  ],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent implements OnInit {

  mode: ProgressSpinnerMode = 'determinate';
  loadingService = inject(LoadingService);

  router = inject(Router);
  codeService = inject(CodeService);

  @Input()
  detectRouteTransitions = true;

  @ContentChild('loading')
  customLoadingIndicator: TemplateRef<any> | null = null;
  showSpinner: boolean = true;

  constructor() {
    this.codeService.isElement.next(true);

  }

  ngOnInit(): void {
  }

}
