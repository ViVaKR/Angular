import { Component } from '@angular/core';
import { WriteUpdateSutraComponent } from '@app/common/write-update-sutra/write-update-sutra.component';

@Component({
  selector: 'app-my-sutra',
  standalone: true,
  imports: [
    WriteUpdateSutraComponent
  ],
  templateUrl: './my-sutra.component.html',
  styleUrl: './my-sutra.component.scss'
})
export class MySutraComponent {

}
