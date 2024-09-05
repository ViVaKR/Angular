import { JsonPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { IIPAddress } from '@app/interfaces/i-ip-address';
import { BibleService } from '@app/services/bible.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit, AfterContentChecked {

  http = inject(HttpClient);
  bibleService = inject(BibleService);
  cdref = inject(ChangeDetectorRef);
  subscription!: Subscription;

  private myIp: string = '';
  get getIp(): string {

    return this.myIp;
  }
  set setIp(value: string) {
    this.myIp = value;
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.cdref.detach();
    this.bibleService.isElement.next(false);
    this.bibleService.publicIPAddress.subscribe({
      next: (value) => {
        this.setIp = value
      },
      error: (_) => {
        console.error('Error  in HomeComponent');
      }
    });
  }

  ngAfterViewInit(): void {
    this.bibleService.getIp().subscribe({
      next: (x: IIPAddress) => {
        this.myIp = x.ip;
        this.bibleService.nextPublicIPAddress(this.myIp);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
      }
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
}
