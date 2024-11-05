import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-ngin-x-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './ngin-x-camp.component.html',
  styleUrl: './ngin-x-camp.component.scss'
})
export class NginXCampComponent {
  title: any = 'NginX Camp';
  message: any = 'NginX 훈련소 준비중';

}
