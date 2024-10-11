import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-asp-net-core-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './asp-net-core-camp.component.html',
  styleUrl: './asp-net-core-camp.component.scss'
})
export class AspNetCoreCampComponent {
  title: any = 'ASP.NET Core Camp';
  message: any = '준비중입니다.';

}
