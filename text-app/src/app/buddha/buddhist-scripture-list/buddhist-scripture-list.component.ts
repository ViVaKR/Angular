import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTreeModule } from '@angular/material/tree';

@Component({
  selector: 'app-buddhist-scripture-list',
  standalone: true,
  imports: [
    MatTreeModule,
    CommonModule
  ],
  templateUrl: './buddhist-scripture-list.component.html',
  styleUrl: './buddhist-scripture-list.component.scss'
})
export class BuddhistScriptureListComponent {
  title = 'buddhistscripturelist';

}
