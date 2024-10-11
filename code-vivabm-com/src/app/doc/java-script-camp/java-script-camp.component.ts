import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-java-script-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './java-script-camp.component.html',
  styleUrl: './java-script-camp.component.scss'
})
export class JavaScriptCampComponent {
  title: any = 'JavaScript Camp';
  message: any = 'JavaScript 훈련소 준비중';

}
