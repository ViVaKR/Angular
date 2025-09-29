import {Component} from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-badge',
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './badge.html',
  styleUrl: './badge.scss'
})
export class Badge {
  title: string;
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor() {
    this.title = 'Badge';
  }

}
