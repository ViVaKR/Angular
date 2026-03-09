import { Component, computed, inject, signal } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { IBottomSheet } from '@app/core/interfaces/i-bottom-sheet';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bottom-sheet',
  imports: [
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    NgClass
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
