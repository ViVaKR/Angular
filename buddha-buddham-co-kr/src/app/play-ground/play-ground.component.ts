import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPlayGround } from '@app/interfaces/i-play-ground';
import { IResponse } from '@app/interfaces/i-response';
import { PlaygroundService } from '@app/services/playground.service';

@Component({
  selector: 'app-play-ground',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './play-ground.component.html',
  styleUrl: './play-ground.component.scss'
})
export class PlayGroundComponent
  implements AfterViewInit, AfterViewChecked, AfterContentChecked, OnInit {

  alertInject = () => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.textContent = 'alert("Hello World")';
    this.elementRef.nativeElement.appendChild(s);
  }

  constructor(private elementRef: ElementRef) {

    // inject ElementRef
    this.alertInject();

  }
  ngAfterViewChecked(): void {
    // console.log('AfterViewChecked');
  }
  ngAfterViewInit(): void {
    console.log('AfterViewInit');
  }

  cdref = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('OnInit');
    // setTimeout(() => {
    //   console.log('Timeout');
    // }, 3000);

    // setInterval(() => {
    //   console.log('Interval');
    // }, 5000);
  }

  ngAfterContentChecked(): void {
    // this.cdref.markForCheck(); // 변화가 감지되지 않을 때 수동으로 감지하도록 변경
    // this.cdref.detectChanges(); // 변화를 감지하고 감지된 변화를 처리

    this.updateMessage();
  }

  message = 'loading :(';

  updateMessage() {
    this.message = 'loaded :)';
  }

  @ViewChild('hi') myHi!: ElementRef;
  @ViewChild('hello') myHello!: ElementRef;

  renderer = inject(Renderer2);
  onDemo() {

    this.myHi.nativeElement.style.color = 'green';
    this.myHi.nativeElement.innerHTML = '<b>Changed</b>';

    this.renderer.setStyle(this.myHello.nativeElement, 'color', 'red');
    this.renderer.setProperty(this.myHello.nativeElement, 'innerHTML', '<b>Changed by renderer</b>');
    this.renderer.addClass(this.myHello.nativeElement, '!text-sky-800');

  }

  playgroundService = inject(PlaygroundService);
  snackBar = inject(MatSnackBar);

  fname = new FormControl('');

  postPlayground() {

    var nums: number[] = [...Array(10).keys()];
    const data: IPlayGround = {
      id: 0,
      text: 'Hello World',
      createdAt: new Date(),
      ModifiedAt: new Date(),
      numbers: nums,
    };
    this.playgroundService.postPlayground(data).subscribe({
      next: (data: IResponse) => {
        console.log(data);
        this.snackBar.open('Playground posted successfully', '닫기', {
          duration: 2000
        });
      },
      error: (err: HttpErrorResponse) => {
        let ref = this.snackBar.open(err.message, '닫기', {
          duration: 10000
        });

        ref.onAction().subscribe(() => {
          ref.dismiss();
        });
      }
    });
  }
}

