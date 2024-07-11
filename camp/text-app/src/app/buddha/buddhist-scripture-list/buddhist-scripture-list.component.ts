import { Component } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';

@Component({
  selector: 'app-buddhist-scripture-list',
  standalone: true,
  imports: [
    MatTreeModule
  ],
  templateUrl: './buddhist-scripture-list.component.html',
  styleUrl: './buddhist-scripture-list.component.scss'
})
export class BuddhistScriptureListComponent {

}
