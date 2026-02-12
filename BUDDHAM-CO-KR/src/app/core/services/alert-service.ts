import { inject, Injectable, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IBottomSheet } from '../interfaces/i-bottom-sheet';
import { BottomSheet } from '@app/shared/components/bottom-sheet/bottom-sheet';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService implements OnDestroy {

  private bottomSheet = inject(MatBottomSheet);
  private subscription!: Subscription;
  /**
   * 시트 알림
   * @param data title, content
   */
  openSheet(data: IBottomSheet[]): void {
    const bottomSheetRef = this.bottomSheet.open(BottomSheet, { data: data });

    this.subscription = bottomSheetRef.afterDismissed().subscribe({
      next: x => console.log(x),
      error: err => console.log(err),
      complete: () => console.log('Completed')
    }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
