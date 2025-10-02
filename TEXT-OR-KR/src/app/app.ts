import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { NavMenu } from './layout/nav-menu/nav-menu';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Footer,
    NavMenu
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {

  protected readonly title = signal('TEXT');

  cdref = inject(ChangeDetectorRef);

  /**
   *
   */
  constructor() {

  }
  ngOnInit(): void {
    console.log('App: ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('App: ngAfterViewInit');
  }

  ngAfterContentChecked(): void {
    console.log('App: ngAfterContnetChecked');
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
    console.log('App: ngOnDestroy');
  }

}
