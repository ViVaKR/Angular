import { inject, Injectable, NgZone } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IBottomSheet } from '../interfaces/i-bottom-sheet';
import { BottomSheet } from '@app/shared/components/bottom-sheet/bottom-sheet';
import { ViewportScroller } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AlertService {

  private bottomSheet = inject(MatBottomSheet);
  private ngZone = inject(NgZone);
  private viewportScroller = inject(ViewportScroller);

  /**
   * 시트 알림
   */
  openSheet(data: IBottomSheet[]): void {
    this.ngZone.run(() => {

      // 1. 최상단으로 스크롤 (smooth)
      this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });

      // 2. 스크롤 애니메잇션 시간을 고려한 딜레이 후 Bottom Sheet 열기
      setTimeout(() => {
        const sheetRef = this.bottomSheet.open(BottomSheet, {
          data: data,
          panelClass: 'alert-bottom-sheet',
          hasBackdrop: true,
          restoreFocus: false // 포커스 복원방지
        });

        // 3. 닫힌 후 최상단 유지
        sheetRef.afterDismissed().subscribe(() => {
          setTimeout(() => {
            this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
          }, 0);
        })


      }, 300);
    });
  }
}
