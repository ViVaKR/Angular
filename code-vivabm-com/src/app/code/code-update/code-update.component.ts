import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { WriteUpdateCodeComponent } from '@app/common/write-update-code/write-update-code.component';

@Component({
  selector: 'app-code-update',
  standalone: true,
  imports: [
    WriteUpdateCodeComponent,
    DatePipe
  ],
  templateUrl: './code-update.component.html',
  styleUrl: './code-update.component.scss'
})
export class CodeUpdateComponent {
  title = 'Code Update';
  division = false;
}
