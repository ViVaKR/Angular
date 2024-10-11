import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-shell-script-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './shell-script-camp.component.html',
  styleUrl: './shell-script-camp.component.scss'
})
export class ShellScriptCampComponent {
  title: any = 'Shell Script Camp';
  message: any = 'Shell Script 훈련소 준비중';

}
