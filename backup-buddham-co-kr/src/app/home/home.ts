import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnDestroy, OnInit {

  counter = signal(456);
  userName = signal('Demo');
  isValidUserId = signal(false);

  private keydownSubscription?: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.keydownSubscription = fromEvent(document, 'keydown').subscribe((event: Event) => {
        // const keyboardEvent = event as KeyboardEvent;
        if (event instanceof KeyboardEvent && event.key === 'Enter') {
          this.counter.update(value => value + 1);
        }
        if (this.userName() !== 'Demo') {
          this.userName.set('Demo')
        }
      });
    }
  }

  ngOnDestroy() {
    this.keydownSubscription?.unsubscribe(); // 메모리 누수 방지
  }

  resetCounter() {
    this.counter.set(0);
    this.userName.set('Test')
  }
}
