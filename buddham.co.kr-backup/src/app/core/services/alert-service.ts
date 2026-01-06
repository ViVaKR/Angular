import { inject, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IBottomSheet } from '../interfaces/i-bottom-sheet';
import { BottomSheet } from '@app/shared/components/bottom-sheet/bottom-sheet';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  private bottomSheet = inject(MatBottomSheet);

  /**
   * 시트 알림
   * @param data title, content
   */
  openSheet(data: IBottomSheet[]): void {
    this.bottomSheet.open(BottomSheet, { data: data });
  }
}
