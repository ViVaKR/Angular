import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet, RouterLink } from '@angular/router';
import { NavBarComponent } from '@app/common/nav-bar/nav-bar.component';
import { FooterComponent } from '@app/common/footer/footer.component';
import { BuddhaService } from './services/buddha.service';
import { single, Subscription } from 'rxjs';
import { NavMenuBarComponent } from './nav-menu-bar/nav-menu-bar.component';
import { LayoutService } from './services/layout.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavBarComponent,
    NavMenuBarComponent,
    FooterComponent,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, AfterContentChecked, OnDestroy, OnInit {

  title = 'Sutra';

  hideFooter = false;

  layoutService = inject(LayoutService);

  cdref = inject(ChangeDetectorRef);
  layoutSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.layoutSubscription = this.layoutService.hideFooter.subscribe({
      next: (x) => {
        if (x) {
          this.hideFooter = true;
          this.cdref.detectChanges();
        } else {
          this.hideFooter = false;
          this.cdref.detectChanges();
        }
      },
      error: (_) => {
        this.hideFooter = false;
        this.cdref.detectChanges();
      }
    });
  }

  ngAfterViewInit(): void {

    this.layoutService.nextFooter(false);
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnDestroy() {
    if (this.layoutSubscription) {
      this.layoutSubscription.unsubscribe();
    }
  }
}
