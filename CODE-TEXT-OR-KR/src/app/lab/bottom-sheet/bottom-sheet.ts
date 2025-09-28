import {Component, inject} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {OverView} from '@app/lab/bottom-sheet/over-view/over-view';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-bottom-sheet',
  imports: [
    MatButtonModule
  ],
  templateUrl: './bottom-sheet.html',
  styleUrl: './bottom-sheet.scss'
})
export class BottomSheet {
  private _sheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._sheet.open(OverView);
  }

}
