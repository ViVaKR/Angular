import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ShowDialog} from '@app/lab/dialog/show-dialog/show-dialog';

@Component({
  selector: 'app-dialog',
  imports: [
    MatButtonModule
  ],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(ShowDialog);
  }
}
