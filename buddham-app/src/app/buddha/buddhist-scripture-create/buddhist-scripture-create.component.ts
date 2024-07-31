import { Component } from '@angular/core';
import { WriteUpdateSutraComponent } from '@app/common/write-update-sutra/write-update-sutra.component';

@Component({
  selector: 'app-buddhist-scripture-create',
  standalone: true,
  imports: [
    WriteUpdateSutraComponent,
  ],
  templateUrl: './buddhist-scripture-create.component.html',
  styleUrl: './buddhist-scripture-create.component.scss',
})
export class BuddhistScriptureCreateComponent {

  title = "경전 쓰기";
  section = 0;

}
