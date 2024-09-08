import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BibleService } from '@app/services/bible.service';
import { Subscription } from 'rxjs';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewSheetComponent } from '@app/bottom-sheet-overview-sheet/bottom-sheet-overview-sheet.component';

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
export class HomeComponent implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {

  bottomSheet = inject(MatBottomSheet);
  http = inject(HttpClient);
  bibleService = inject(BibleService);
  cdref = inject(ChangeDetectorRef);
  subscription!: Subscription;

  private myIp: string = '0.0.0.0';
  set setIp(value: string) {
    this.myIp = value;
    this.cdref.detectChanges();
  }
  get getIp(): string {
    return this.myIp;
  }


  constructor() {
    this.cdref.detach();
  }

  ngOnInit(): void {
    this.bibleService.isElement.next(false);
  }

  ngAfterViewInit(): void {
    // fetch('https://api.ipify.org?format=json')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setIp = data.ip;
    //     this.bibleService.nextPublicIPAddress(this.getIp);
    //   })
    //   .catch(_ => {
    //     this.myIp = '0.0.0.0';
    //     this.bibleService.nextPublicIPAddress(this.myIp);
    //   });
  }

  ngAfterContentChecked(): void {
    // this.cdref.detectChanges();
  }

  openSheet() {
    this.bottomSheet.open(BottomSheetOverviewSheetComponent);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
