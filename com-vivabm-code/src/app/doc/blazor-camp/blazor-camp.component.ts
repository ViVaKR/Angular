import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-blazor-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './blazor-camp.component.html',
  styleUrl: './blazor-camp.component.scss'
})
export class BlazorCampComponent {
  title: any = 'Blazor Camp';
  message: any = '준비중입니다.';

}
