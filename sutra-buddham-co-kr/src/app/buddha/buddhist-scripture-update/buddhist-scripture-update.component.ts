import { Component } from '@angular/core';
import { WriteUpdateSutraComponent } from '@app/common/write-update-sutra/write-update-sutra.component';

@Component({
  selector: 'app-buddhist-scripture-update',
  standalone: true,
  imports: [
    WriteUpdateSutraComponent,
  ],
  templateUrl: './buddhist-scripture-update.component.html',
  styleUrl: './buddhist-scripture-update.component.scss'
})
export class BuddhistScriptureUpdateComponent {
  title = "경전 수정";
  section = 1;
}
