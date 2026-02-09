import { Component, Input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-page-title',
  imports: [
    MatIconModule
  ],
  templateUrl: './page-title.html',
  styleUrl: './page-title.scss',
})
export class PageTitle {
  @Input() title: string | null = null;
}
