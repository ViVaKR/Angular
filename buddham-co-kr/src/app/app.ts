import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenu } from "./top-menu/top-menu";
import { FooterMenu } from "./footer-menu/footer-menu";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopMenu, FooterMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Buddhist Scriptures');
}
