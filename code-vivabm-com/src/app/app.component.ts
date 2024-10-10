import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { SocialLoginModule, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { CodeService } from './services/code.service';
import { Subscription } from 'rxjs';
import { FooterBarComponent } from './common/footer-bar/footer-bar.component';
import { LoadingIndicatorComponent } from "./loading-indictor/loading-indictor.component";
import { CircleProgressComponent } from "./common/circle-progress/circle-progress.component";
import { LoadingService } from './services/loading.service';
import { LoadingCircleComponent } from "./common/loading-circle/loading-circle.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    SocialLoginModule,
    NavMenuComponent,
    GoogleSigninButtonModule,
    FooterBarComponent,
    LoadingIndicatorComponent, CircleProgressComponent, LoadingCircleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {

  title = 'Viv';
  codeService = inject(CodeService);
  cdref = inject(ChangeDetectorRef);
  loadingService = inject(LoadingService);
  hideFooter: boolean = false;

  // vcr = viewChild('container', { read: ViewContainerRef });

  subscription!: Subscription;
  showSpinner: boolean = true;

  constructor() {
    this.cdref.detach();
    this.cdref.reattach()
    this.subscription = this.codeService.isElement.subscribe({
      next: (value) => {
        this.hideFooter = value;
      },
      error: (_) => this.hideFooter = false
    });
    this.loadingService.loading$.subscribe({
      next: (loading) => {
        this.showSpinner = loading;
      },
      error: (_) => this.showSpinner = false
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
  }


  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
