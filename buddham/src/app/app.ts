import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainFooter } from "./main-footer/main-footer";
import { MainMenuBar } from "./main-menu-bar/main-menu-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainFooter, MainMenuBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('buddham');
}
