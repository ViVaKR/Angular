import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boot-camp',
  standalone: true,
  imports: [],
  templateUrl: './boot-camp.component.html',
  styleUrl: './boot-camp.component.scss'
})
export class BootCampComponent {
  @Input() title: any = 'Boot Camp';

}
