import { inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IBottomSheet } from '../interfaces/i-bottom-sheet';
import { BottomSheet } from '@app/shared/components/bottom-sheet/bottom-sheet';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService implements OnDestroy {

  private bottomSheet = inject(MatBottomSheet);
  private ngZone = inject(NgZone);

  private subscription!: Subscription;
  /**
   * 시트 알림
   * @param data title, content
   */
  openSheet(data: IBottomSheet[]): void {

    this.ngZone.run(() => {
      this.bottomSheet.open(BottomSheet, {
        data: data,
        panelClass: 'alert-bottom-sheet',
        hasBackdrop: true,

      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
