import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
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

  constructor(private router: Router) { }


  goNavigate(link: string) {
    this.router.navigate([link]);
  }

}
