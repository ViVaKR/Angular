import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IIPAddress } from '@app/interfaces/i-ip-address';
import { BibleService } from '@app/services/bible.service';
import { Subscription } from 'rxjs';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewSheetComponent } from '@app/bottom-sheet-overview-sheet/bottom-sheet-overview-sheet.component';
import { DataShareService } from '@app/services/data-share.service';

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
export class HomeComponent implements OnInit, AfterViewInit, AfterContentChecked {

  private bottomSheet = inject(MatBottomSheet);
  private shareService = inject(DataShareService);

  openSheet() {
    this.bottomSheet.open(BottomSheetOverviewSheetComponent);
  }

  http = inject(HttpClient);
  bibleService = inject(BibleService);
  cdref = inject(ChangeDetectorRef);
  subscription!: Subscription;

  // private myIp: string = '';

  // get getIp(): string {
  //   return this.myIp;
  // }

  // set setIp(value: string) {
  //   this.myIp = value;
  //   this.cdref.detectChanges();
  // }

  private todayMessage: string = '';

  get getMessage(): string {
    return this.todayMessage;
  }
  set setMessage(value: string) {
    this.todayMessage = value;
    this.cdref.detectChanges();
  }

  constructor() {
    this.cdref.detach();
  }

  ngOnInit(): void {
    this.bibleService.isElement.next(false);
    // this.bibleService.publicIPAddress.subscribe({
    //   next: (value) => {
    //     this.setIp = value
    //   }
    // });
  }

  ngAfterViewInit(): void {

    // this.bibleService.getIp().subscribe({
    //   next: (x: IIPAddress) => {
    //     this.myIp = x.ip;
    //     this.bibleService.nextPublicIPAddress(this.myIp);
    //   }
    // });

    this.shareService.currentMessage.subscribe({
      next: (value) => {
        this.setMessage = value;
      }
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
}
