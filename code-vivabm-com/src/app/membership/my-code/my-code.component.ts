import { Component } from '@angular/core';
import { WriteUpdateCodeComponent } from "../../common/write-update-code/write-update-code.component";

@Component({
  selector: 'app-my-code',
  standalone: true,
  imports: [WriteUpdateCodeComponent],
  templateUrl: './my-code.component.html',
  styleUrl: './my-code.component.scss'
})
export class MyCodeComponent {

}
