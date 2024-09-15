import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BibleService } from '@app/services/bible.service';
import { Subscription } from 'rxjs';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewSheetComponent } from '@app/bottom-sheet-overview-sheet/bottom-sheet-overview-sheet.component';
import { TodayMessageService } from '@app/services/today-message.service';
import { AuthService } from '@app/services/auth.service';
import { IResponse } from '@app/interfaces/i-response';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    MatButtonModule,
    MatBottomSheetModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  bottomSheet = inject(MatBottomSheet);
  http = inject(HttpClient);
  bibleService = inject(BibleService);
  authService = inject(AuthService);

  cdref = inject(ChangeDetectorRef);
  subscription!: Subscription;
  myMessage: string = '빛이 있으라';

  ngOnInit(): void {
    this.bibleService.isElement.next(false);
  }

  ngAfterViewInit(): void { }

  openSheet() {
    this.bottomSheet.open(BottomSheetOverviewSheetComponent);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
