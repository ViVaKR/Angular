import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet, RouterLink } from '@angular/router';
import { NavBarComponent } from '@app/common/nav-bar/nav-bar.component';
import { FooterComponent } from '@app/common/footer/footer.component';
import { BuddhaService } from './services/buddha.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavBarComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy, AfterViewInit, OnInit {
  title = 'Sutra';
  hideFooter: boolean = false;
  elemantSubscription!: Subscription;
  constructor(private service: BuddhaService) { }

  ngOnInit(): void {
    this.elemantSubscription = this.service.isElement.subscribe(x => {
      this.hideFooter = x;
    });
  }

  ngAfterViewInit(): void {
    console.log('AppComponent ngAfterViewInit');
  }

  ngOnDestroy() {
    if (this.elemantSubscription) {
      this.elemantSubscription.unsubscribe();
    }
  }
}
