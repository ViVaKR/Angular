import { Component, inject, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { AuthService } from '@app/services/auth.service';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    AllMatModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  authServices = inject(AuthService);

  isLoggedIn = this.authServices.isLoggedIn();

  router = inject(Router);
  constructor() { }

  goNavigate(link: string, id: number | null) {
    if (id === null) {
      this.router.navigate([link]);
    } else {
      this.router.navigate([link], { queryParams: { id } });

    }
  }

}
