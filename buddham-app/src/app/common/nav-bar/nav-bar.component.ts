import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, isDevMode, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { UserDetail } from '@app/interfaces/user-detail';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { AuthService } from '@app/services/auth.service';
import { environment } from '@env/environment.development';
import { BehaviorSubject, map, Observable } from 'rxjs';

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

  id: number | null = null;

  authServices = inject(AuthService);

  isLoggedIn: boolean = this.authServices.isLoggedIn();
  isAdmin: boolean = false;

  userDetail: {
    id: number,
    fullName: string,
    email: string,
    role: string[]
  } | null = this.authServices.getUserDetail();

  router = inject(Router);
  isDev: boolean;
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

  // isAdmin(): boolean | null | undefined {
  //   const roles = this.authServices.getRoles();
  //   if (roles === null || roles === undefined) return false;

  //   const rs = roles.filter(role => role === 'Admin').length > 0;
  //   if (rs) return true;
  //   return false;
  // }
}
