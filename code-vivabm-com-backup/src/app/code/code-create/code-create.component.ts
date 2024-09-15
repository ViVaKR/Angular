import { Component } from '@angular/core';
import { WriteUpdateCodeComponent } from '@app/common/write-update-code/write-update-code.component';

@Component({
  selector: 'app-code-create',
  standalone: true,
  imports: [
    WriteUpdateCodeComponent
  ],
  templateUrl: './code-create.component.html',
  styleUrl: './code-create.component.scss'
})
export class CodeCreateComponent {

  title = 'Code Create';
  division = true;

  constructor() { }

}
