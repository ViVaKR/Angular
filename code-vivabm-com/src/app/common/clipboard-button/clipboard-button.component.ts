import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-clipboard-button',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './clipboard-button.component.html',
  styleUrl: './clipboard-button.component.scss'
})
export class ClipboardButtonComponent {
  onClick() {
    alert('Copied to clipboard');
  }

}
