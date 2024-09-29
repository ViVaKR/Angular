import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CodeService } from '@app/services/code.service';
import { CircleProgressComponent } from "../common/circle-progress/circle-progress.component";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    CircleProgressComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(CircleProgressComponent) circleProgress!: CircleProgressComponent;
  @Input() speed: number = 5;
  http = inject(HttpClient);
  codeService = inject(CodeService);
  ipAddress: string = '0.0.0.0';

  // i: number = 0;
  // setProgress = signal<number>(0);

  // async process() {
  //   await new Promise(resolve => setTimeout(resolve, this.speed))
  //     .then(() => {
  //       if (this.i >= 101) return;
  //       this.setProgress.set(this.i++);
  //       this.process();
  //     });
  // }

  // constructor() {
  //   this.i = 0;
  // }

  ngAfterViewInit(): void { }

  ngOnInit() {
    this.codeService.isElement.next(false);
    this.codeService.publicIPAddress.subscribe((ip: string) => this.ipAddress = ip);

    console.log("re enter home component");
    this.codeService.isElement.next(false);
  }
}
