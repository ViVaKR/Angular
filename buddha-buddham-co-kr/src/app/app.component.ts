import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet, RouterLink } from '@angular/router';
import { NavBarComponent } from '@app/common/nav-bar/nav-bar.component';
import { FooterComponent } from '@app/common/footer/footer.component';
import { BuddhaService } from './services/buddha.service';
import { Subscription } from 'rxjs';
import { NavMenuBarComponent } from './nav-menu-bar/nav-menu-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavBarComponent,
    NavMenuBarComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy, AfterContentChecked, OnInit {
  title = 'Sutra';
  hideFooter: boolean = false;
  elemantSubscription!: Subscription;
  buddhaService = inject(BuddhaService);
  cdref = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.elemantSubscription = this.buddhaService.isElement.subscribe({
      next: (x) => this.hideFooter = x,
      error: (_) => this.hideFooter = false
    });

  }
  ngAfterContentChecked(): void {
    this.cdref.detectChanges(); // 변경된 표현식이 확인된 후에 변경되었습니다경고를 제거하기 위해 추가
  }

  ngOnDestroy() {
    if (this.elemantSubscription) {
      this.elemantSubscription.unsubscribe();
    }
  }
}
