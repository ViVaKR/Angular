import { AfterContentChecked, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { SocialLoginModule, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { CodeService } from './services/code.service';
import { Subscription } from 'rxjs';
import { FooterBarComponent } from './common/footer-bar/footer-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    SocialLoginModule,
    NavMenuComponent,
    GoogleSigninButtonModule,
    FooterBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy, AfterContentChecked {
  title = 'Viv';
  codeService = inject(CodeService);
  cdref = inject(ChangeDetectorRef);

  hideFooter: boolean = false;

  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.codeService.isElement.subscribe({
      next: (value) => {
        this.hideFooter = value;
      },
      error: (_) => {
        this.hideFooter = false;
      }
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }
}
