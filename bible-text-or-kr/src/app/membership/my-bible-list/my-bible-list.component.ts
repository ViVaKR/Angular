import { Component } from '@angular/core';
import { BibleListComponent } from "../../bible/bible-list/bible-list.component";

@Component({
  selector: 'app-my-bible-list',
  standalone: true,
  imports: [BibleListComponent],
  templateUrl: './my-bible-list.component.html',
  styleUrl: './my-bible-list.component.scss'
})
export class MyBibleListComponent {

}
