import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { FooterBarComponent } from "./footer-bar/footer-bar.component";
import { Subscription } from 'rxjs';
import { BibleService } from './services/bible.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IIPAddress } from './interfaces/i-ip-address';
import { NavMenuBarComponent } from './nav-menu-bar/nav-menu-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent, NavMenuBarComponent, FooterBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {

  title = 'Bible Study';
  hideFooter!: boolean;
  bibleService = inject(BibleService);
  cdref = inject(ChangeDetectorRef);
  subscription!: Subscription;

  ngOnInit(): void {
    this.cdref.detach();
    this.subscription = this.bibleService.isElement.subscribe({
      next: (value) => {
        this.hideFooter = value;
        this.getIp();
      },
      error: (_) => {
        this.hideFooter = false;
      }
    });

    this.bibleService.getIp().subscribe({
      next: (x: IIPAddress) => {
        console.log(x.ip);
        this.bibleService.nextPublicIPAddress(x.ip);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
      }
    });

  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  http = inject(HttpClient);

  getIp() {
    // fetch('https://api.ipify.org?format=json')
    //   .then(Response => {
    //     return Response.json();
    //   })
    //   .then(data => {
    //     this.bibleService.nextPublicIPAddress(data.ip);
    //   });

    // let temp = this.http.get('https://api.ipify.org?format=json');
    // temp.subscribe({
    //   next: (x) => {
    //     console.log();
    //     let t = JSON.stringify(x);
    //     let y = JSON.parse(t);
    //     console.log(y.ip);

    //     this.bibleService.nextPublicIPAddress(y.ip);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // });

  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
