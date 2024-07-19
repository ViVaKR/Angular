import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { AuthService } from '@app/services/auth.service';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    AllMatModule,
    NgIf,
    NgFor
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, AfterViewInit {

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  authServices = inject(AuthService);

  isLoggedIn: boolean = this.authServices.isLoggedIn();

  router = inject(Router);
  constructor() {
    this.authServices.isSignIn.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authServices.isLoggedIn();
  }

  ngAfterViewInit(): void {
    this.authServices.isSignIn.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
      }
    });
  }

  goNavigate(link: string, id: number | null) {
    if (id === null) {
      this.router.navigate([link]);
    } else {
      this.router.navigate([link], { queryParams: { id } });
    }
  }
}
