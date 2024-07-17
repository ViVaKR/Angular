import { AfterViewInit, Component, OnDestroy, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet, RouterLink } from '@angular/router';
import { NavBarComponent } from '@app/common/nav-bar/nav-bar.component';
import { FooterComponent } from '@app/common/footer/footer.component';
import { BuddhaService } from './services/buddha.service';
import { Subscription } from 'rxjs';
import { TopNavBarComponent } from "./common/top-nav-bar/top-nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavBarComponent,
    FooterComponent,
    CommonModule,
    TopNavBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy, AfterContentChecked, AfterViewInit, OnInit {
  title = 'Sutra';
  hideFooter: boolean = false;
  elemantSubscription!: Subscription;
  constructor(private service: BuddhaService, private cdref: ChangeDetectorRef) { }
  ngAfterContentChecked(): void {
    this.cdref.detectChanges(); // ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked., 변경된 표현식이 확인된 후에 변경되었습니다경고를 제거하기 위해 추가
  }

  ngOnInit(): void {
    this.elemantSubscription = this.service.isElement.subscribe(x => {
      this.hideFooter = x;
    });
  }

  ngAfterViewInit(): void {
    //
  }

  ngOnDestroy() {
    if (this.elemantSubscription) {
      this.elemantSubscription.unsubscribe();
    }
  }
}
