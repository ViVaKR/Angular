import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, isDevMode, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { ILoginUser } from '@app/interfaces/i-login-user';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    AllMatModule,
    NgIf,
    NgFor,
    JsonPipe
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, AfterViewInit {

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  authServices = inject(AuthService);

  isLoggedIn: boolean = this.authServices.isLoggedIn();
  isAdmin: boolean = false;

  userDetail: ILoginUser = this.authServices.getUserDetail()!;

  router = inject(Router);
  isDev: boolean;
  id: any | undefined = undefined;

  constructor() {
    this.isDev = isDevMode();
    this.authServices.isSignIn.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
        this.id = this.authServices.getUserDetail()?.id;
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authServices.isLoggedIn();

    this.authServices.isAdmin().subscribe({
      next: (res) => {
        this.isAdmin = res;
      }
    });
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
