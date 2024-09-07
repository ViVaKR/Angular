import { Component } from '@angular/core';
import { BibleWriteUpdateComponent } from '@app/bible/bible-write-update/bible-write-update.component';

@Component({
  selector: 'app-my-bible',
  standalone: true,
  imports: [
    BibleWriteUpdateComponent
  ],
  templateUrl: './my-bible.component.html',
  styleUrl: './my-bible.component.scss'
})
export class MyBibleComponent {

}
