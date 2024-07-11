import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavBarComponent } from '@app/common/nav-bar/nav-bar.component';
import { FooterComponent } from '@app/common/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Buddist Scripture';
}
