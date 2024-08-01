import { Component, isDevMode } from '@angular/core';

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.scss'
})
export class FooterBarComponent {

  currentMode: boolean;

  constructor() {
    this.currentMode = isDevMode();
  }

}
