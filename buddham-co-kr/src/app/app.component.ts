import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuBarComponent } from "./nav-menu-bar/nav-menu-bar.component";
import { FooterBarComponent } from "./footer-bar/footer-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMenuBarComponent, FooterBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buddham-co-kr';
}
