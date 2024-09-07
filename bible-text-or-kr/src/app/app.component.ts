import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterBarComponent } from "./footer-bar/footer-bar.component";
import { Subscription } from 'rxjs';
import { BibleService } from './services/bible.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IIPAddress } from './interfaces/i-ip-address';
import { NavMenuBarComponent } from './nav-menu-bar/nav-menu-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuBarComponent, FooterBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {

  title = 'BIBLE NOTEBOOK';
  hideFooter!: boolean;
  bibleService = inject(BibleService);
  cdref = inject(ChangeDetectorRef);
  snackBar = inject(MatSnackBar);
  subscription!: Subscription;

  ngOnInit(): void {
    this.cdref.detach();
    this.subscription = this.bibleService.isElement.subscribe({
      next: (value) => {
        this.hideFooter = value;
      },
      error: (_) => {
        this.hideFooter = false;
      }
    });

    this.bibleService.getIp().subscribe({
      next: (x: IIPAddress) => {
        this.bibleService.nextPublicIPAddress(x.ip);
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
