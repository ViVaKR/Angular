import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-goto-login',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './goto-login.component.html',
  styleUrl: './goto-login.component.scss'
})
export class GotoLoginComponent {

}
