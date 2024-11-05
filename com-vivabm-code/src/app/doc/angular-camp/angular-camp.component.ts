import { Component, Input } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-angular-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './angular-camp.component.html',
  styleUrl: './angular-camp.component.scss'
})
export class AngularCampComponent {
  @Input() title: any = 'Angular Camp';
  @Input() message: any = '준비중입니다.';

}
