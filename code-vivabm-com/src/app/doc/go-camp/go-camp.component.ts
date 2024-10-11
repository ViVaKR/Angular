import { Component, Input } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-go-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './go-camp.component.html',
  styleUrl: './go-camp.component.scss'
})
export class GoCampComponent {
  @Input() title: any = 'Go Camp';
  @Input() message: any = '준비중입니다.';

}
