import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-vba-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './vba-camp.component.html',
  styleUrl: './vba-camp.component.scss'
})
export class VbaCampComponent {
  title: any = 'VBA Camp';
  message: any = 'VBA 훈련소 준비중';

}
