import {Component, inject} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-over-view',
  imports: [
    MatListModule,
  ],
  templateUrl: './over-view.html',
  styleUrl: './over-view.scss'
})
export class OverView {
  private _sheetRef =
    inject<MatBottomSheetRef<OverView>>(MatBottomSheetRef);

  openLink(event: MouseEvent): void {
    this._sheetRef.dismiss();
    event.preventDefault();
  }
}
