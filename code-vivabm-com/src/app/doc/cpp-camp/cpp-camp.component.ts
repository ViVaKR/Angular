import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-cpp-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './cpp-camp.component.html',
  styleUrl: './cpp-camp.component.scss'
})
export class CppCampComponent {
  title: any = 'C++ Camp';
  message: any = 'C++ 훈련소 준비중';

}
