import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { FooterBarComponent } from './common/footer-bar/footer-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionService } from './services/action.service';
import { LoadingIndicatorComponent } from "./common/loading-indicator/loading-indicator.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavMenuComponent,
    FooterBarComponent,
    MatProgressSpinnerModule, LoadingIndicatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {
  title = 'Viv';
  hideFooter: boolean = false;

  actionService = inject(ActionService);
  cdref = inject(ChangeDetectorRef);

  constructor() { }
  ngOnInit(): void {

    this.actionService.footerBar$.subscribe((value) => {
      this.hideFooter = value;
    });
    this.actionService.footerBarOn();
  }

  ngAfterViewInit(): void {

  }
  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
  ngOnDestroy(): void { }
}
