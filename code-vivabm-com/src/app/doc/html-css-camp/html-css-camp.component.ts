import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-html-css-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './html-css-camp.component.html',
  styleUrl: './html-css-camp.component.scss'
})
export class HtmlCssCampComponent {
  title: any = 'HTML/CSS Camp';
  message: any = 'HTML/CSS 훈련소 준비중';

}
