import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-viv',
  templateUrl: './dialog-viv.component.html',
  styleUrls: ['./dialog-viv.component.css']
})
export class DialogVivComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
