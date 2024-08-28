import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blank-space',
  standalone: true,
  imports: [],
  templateUrl: './blank-space.component.html',
  styleUrl: './blank-space.component.scss'
})
export class BlankSpaceComponent {

  @Input() userId: string = '';
  @Input() userName: string = '';
  @Input() myIp: string = '';
}
