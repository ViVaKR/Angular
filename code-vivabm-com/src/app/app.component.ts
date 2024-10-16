import { AfterContentChecked, AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { FooterBarComponent } from './common/footer-bar/footer-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionService } from './services/action.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavMenuComponent,
    FooterBarComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {
  title = 'Viv';
  hideFooter: boolean = false;
  hideSppinner: boolean = false;

  actionService = inject(ActionService);

  constructor() { }
  ngOnInit(): void {

    this.actionService.progressBar$.subscribe((value) => {
      this.hideSppinner = value;
    });
    this.actionService.footerBar$.subscribe((value) => {
      this.hideFooter = value;
    });
    this.actionService.progressBarOff();
    this.actionService.footerBarOn();
  }

  ngAfterViewInit(): void {

  }
  ngAfterContentChecked(): void { }

  ngOnDestroy(): void { }
}
