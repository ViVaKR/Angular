import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-node-js-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './node-js-camp.component.html',
  styleUrl: './node-js-camp.component.scss'
})
export class NodeJsCampComponent {
  title: any = 'Node.js Camp';
  message: any = 'Node.js 훈련소 준비중';

}
