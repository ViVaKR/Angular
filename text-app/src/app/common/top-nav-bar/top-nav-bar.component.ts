import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule
  ],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.scss'
})
export class TopNavBarComponent {

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  authServices = inject(AuthService);

  router = inject(Router);

  isLoggedIn = this.authServices.isLoggedIn();

}
