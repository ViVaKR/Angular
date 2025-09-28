import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { NavMenu } from './layout/nav-menu/nav-menu';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Footer,
    NavMenu
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TEXT');
}
