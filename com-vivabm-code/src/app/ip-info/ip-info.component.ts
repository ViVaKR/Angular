import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IIpInfo } from '@app/interfaces/i-ip-info';
import { ActionService } from '@app/services/action.service';
import { UtilityService } from '@app/services/utility.service';
import { Subscription } from 'rxjs';

declare const kakao: any;

@Component({
  selector: 'app-ip-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './ip-info.component.html',
  styleUrl: './ip-info.component.scss'
})
export class IpInfoComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Ip Info';
  lat: number;
  lng: number;

  ipInfo: IIpInfo = {
    ip: '',
    city: '',
    region: '',
    country: '',
    location: '',
    isp: '',
  }

  utilityService = inject(UtilityService);
  utilitySubscription: Subscription;
  actionService = inject(ActionService);
  cdref = inject(ChangeDetectorRef);
  snackbar = inject(MatSnackBar);
  sanitizer = inject(DomSanitizer);

  ipAddress: any;
  htmlContent: SafeHtml = ''; // SafeHtml 타입으로 변경

  constructor() {
    this.actionService.footerBarOff();
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.utilityService.getMyInfo().subscribe({
      next: (data: IIpInfo) => {
        this.ipAddress = data.ip;
        this.getIpInfo();
      }
    });
  }

  getIpInfo() {

    if (this.ipAddress === undefined || this.ipAddress === '') {
      this.snackbar.open('Please enter an IP Address', 'Close', {
        duration: 3000
      });
      return;
    }

    this.utilitySubscription = this.utilityService.getIpInfo(this.ipAddress).subscribe({
      next: (data: IIpInfo) => {
        this.ipInfo = data;
        this.lat = Number(data.location.split(',')[0].trim());
        this.lng = Number(data.location.split(',')[1].trim());
      },
      error: (error) => {
        console.error(error);
      }
    });

  }

  ngOnDestroy(): void {
    if (this.utilitySubscription) {
      this.utilitySubscription.unsubscribe();
    }
  }
}
