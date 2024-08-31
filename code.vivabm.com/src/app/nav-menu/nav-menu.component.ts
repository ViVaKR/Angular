import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject, isDevMode, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ICodeResponse } from '@app/interfaces/i-code-response';
import { AuthService } from '@app/services/auth.service';
import { CodeService } from '@app/services/code.service';
import { GlobalService } from '@app/services/global.service';
import { environment } from '@env/environment.development';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatMenuModule,
    MatIconModule,
    NgIf,
    NgFor,
    JsonPipe
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit, AfterViewInit {

  title = "Viv";

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  router = inject(Router);
  codeService = inject(CodeService);
  authService = inject(AuthService);

  isAdmin: boolean = false;
  isDev: boolean;
  isLoggedIn: boolean = this.authService.isLoggedIn();
  id: number | null = null;

  userDetail: {
    id: number,
    fullName: string,
    email: string,
    roles: string[]
  } | null = this.authService.getUserDetail();

  constructor() {

    this.isDev = isDevMode();

    this.authService.isSignIn.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
        this.id = this.authService.getUserDetail()?.id;
      }
    });
  }

  ngOnInit(): void {

    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.isAdmin().subscribe({
      next: (res) => {
        this.isAdmin = res;
      }
    });
  }

  ngAfterViewInit(): void {
    this.authService.isSignIn.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
      }
    });
  }

  goToProfile() {
    this.router.navigate(['/Profile'], {
      queryParams: { id: this.id }
    });
  }

  goToLink(url: string, id: number | null) {
    if (id === null) {
      this.router.navigate([url]);
    } else {
      this.router.navigate([url], {
        queryParams: { id: id }
      });
    }
  }

  signOut() {
    this.authService.signOut();
  }
}
