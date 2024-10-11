import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-power-shell-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './power-shell-camp.component.html',
  styleUrl: './power-shell-camp.component.scss'
})
export class PowerShellCampComponent {
  title: any = 'PowerShell Camp';
  message: any = 'PowerShell 훈련소 준비중';

}
