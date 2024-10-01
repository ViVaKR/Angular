import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.scss'
})
export class FooterBarComponent {
  today: number = Date.now();
}
