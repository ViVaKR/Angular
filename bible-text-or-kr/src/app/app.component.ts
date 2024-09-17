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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuBarComponent, FooterBarComponent],
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

  constructor() {

    let id = this.authService.getUserDetail()?.id;
    if (id === undefined || id === null) return;

    this.messageService.getMessageByUserId(id).subscribe({
      next: (response: IResponse) => {
        this.messageService.next(response);
      }
    });
  }

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
