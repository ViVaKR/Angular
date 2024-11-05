import { Component, Input } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-csharp-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './csharp-camp.component.html',
  styleUrl: './csharp-camp.component.scss'
})
export class CsharpCampComponent {
  @Input() title: any = 'C# Camp';
  @Input() message: any = 'C# 훈련소 준비중';

}
