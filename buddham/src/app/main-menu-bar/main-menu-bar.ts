import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-menu-bar',
  imports: [
    RouterLink
  ],
  templateUrl: './main-menu-bar.html',
  styleUrl: './main-menu-bar.scss'
})
export class MainMenuBar {

  // private router = inject(Router);

  // goTo(url: string[]) {
  //   this.router.navigate(url);
  // }
}
