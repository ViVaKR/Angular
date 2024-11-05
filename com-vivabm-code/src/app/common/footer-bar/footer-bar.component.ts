import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkActive
  ],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.scss'
})
export class FooterBarComponent implements AfterContentChecked, AfterViewInit {

  today: number = Date.now();

  router = inject(Router);

  cdr = inject(ChangeDetectorRef);
  ngAfterViewInit(): void {

  }
  goTo(url: string) {
    this.router.navigate([url]);
  }
  ngAfterContentChecked(): void {

  }

}
