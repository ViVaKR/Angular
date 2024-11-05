import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-sql-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './sql-camp.component.html',
  styleUrl: './sql-camp.component.scss'
})
export class SqlCampComponent {
  title: any = 'SQL Camp';
  message: any = 'SQL 훈련소 준비중';

}
