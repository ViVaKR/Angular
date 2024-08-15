import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-viv',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './dialog-viv.component.html',
  styleUrl: './dialog-viv.component.scss'
})
export class DialogVivComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
