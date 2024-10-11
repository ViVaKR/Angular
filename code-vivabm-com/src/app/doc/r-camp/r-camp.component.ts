import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-r-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './r-camp.component.html',
  styleUrl: './r-camp.component.scss'
})
export class RCampComponent {
  title: any = 'R Camp';
  message: any = 'R 훈련소 준비중';

}
