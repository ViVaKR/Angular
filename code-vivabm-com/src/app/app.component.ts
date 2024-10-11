import { AfterContentChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { FooterBarComponent } from './common/footer-bar/footer-bar.component';
import { LoadingIndicatorComponent } from "./loading-indictor/loading-indictor.component";
import { CircleProgressComponent } from "./common/circle-progress/circle-progress.component";
import { LoadingCircleComponent } from "./common/loading-circle/loading-circle.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavMenuComponent,
    FooterBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {
  title = 'Viv';
  constructor() { }
  ngOnInit(): void { }
  ngAfterViewInit(): void { }
  ngAfterContentChecked(): void { }
  ngOnDestroy(): void { }
}
