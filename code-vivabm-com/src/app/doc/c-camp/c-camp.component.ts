import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-c-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './c-camp.component.html',
  styleUrl: './c-camp.component.scss'
})
export class CCampComponent {
  title: any = 'C Camp';
  message: any = 'C 훈련소 준비중';

}
