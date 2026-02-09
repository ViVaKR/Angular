import { Component, Inject, inject, input, signal, WritableSignal } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { IBottomSheet } from '@app/core/interfaces/i-bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  imports: [
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule
  ],
  templateUrl: './bottom-sheet.html',
  styleUrl: './bottom-sheet.scss',
})
export class BottomSheet {
  private bottomSheetRef = inject(MatBottomSheetRef<BottomSheet>);
  readonly dataList = signal<IBottomSheet[]>(inject<IBottomSheet[]>(MAT_BOTTOM_SHEET_DATA));
  close(event: MouseEvent): void {
    event.preventDefault();
    this.bottomSheetRef.dismiss();
  }
}

// private _bottomSheetRef = inject<MatBottomSheetRef<BottomSheet>>(MatBottomSheetRef);
// dataList: WritableSignal<IBottomSheet[] | null> = signal<IBottomSheet[] | null>([])
// constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: IBottomSheet[]) {
//   this.dataList.set(data);
// }
// close(event: MouseEvent): void {
//   this._bottomSheetRef.dismiss();
//   event.preventDefault();
// }
