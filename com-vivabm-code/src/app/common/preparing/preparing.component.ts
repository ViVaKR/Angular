import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preparing',
  standalone: true,
  imports: [],
  templateUrl: './preparing.component.html',
  styleUrl: './preparing.component.scss'
})
export class PreparingComponent {
  @Input() title: any = '-';
  @Input() message: any = '-';

}
