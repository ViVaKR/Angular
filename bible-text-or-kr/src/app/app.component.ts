import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterBarComponent } from "./footer-bar/footer-bar.component";
import { Subscription } from 'rxjs';
import { BibleService } from './services/bible.service';
import { NavMenuBarComponent } from './nav-menu-bar/nav-menu-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodayMessageService } from './services/today-message.service';
import { AuthService } from './services/auth.service';
import { IResponse } from './interfaces/i-response';
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuBarComponent, FooterBarComponent, NavBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent implements OnInit, OnDestroy {

  title = 'BIBLE NOTEBOOK';
  hideFooter!: boolean;
  authService = inject(AuthService);
  bibleService = inject(BibleService);
  cdref = inject(ChangeDetectorRef);
  snackBar = inject(MatSnackBar);
  messageService = inject(TodayMessageService);
  subscription!: Subscription;

  router = inject(Router);


  ngOnInit(): void {
    this.subscription = this.bibleService.isElement.subscribe({
      next: (value) => {
        this.hideFooter = value;
      },
      error: (_) => {
        this.hideFooter = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
