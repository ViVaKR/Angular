import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, Renderer2, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BibleService } from '@app/services/bible.service';
import { interval, Subscription } from 'rxjs';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewSheetComponent } from '@app/bottom-sheet-overview-sheet/bottom-sheet-overview-sheet.component';
import { AuthService } from '@app/services/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    MatButtonModule,
    MatBottomSheetModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
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

  value = 0;
  loading = signal(false);
  mode: ProgressSpinnerMode = 'determinate';

  ngOnInit(): void {
    this.bibleService.isElement.next(false);
  }
  openSheet() {
    this.bottomSheet.open(BottomSheetOverviewSheetComponent);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.loading.set(false);
  }

  constructor() {
    this.loading.set(true);
    // this.loadContent();
  }

  // loadContent() {
  //   const subs$: Subscription = interval(1000).subscribe({
  //     next: () => {
  //       this.value += 10;
  //       if (this.value >= 100) {
  //         subs$.unsubscribe();
  //         this.loading.set(false);
  //       }
  //     }
  //   })
  // }
}
