import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-clipboard-button',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './clipboard-button.component.html',
  styleUrl: './clipboard-button.component.scss'
})
export class ClipboardButtonComponent {
  snackBar = inject(MatSnackBar);

  onClick() {
    this.snackBar.open('클립보드에 복사되었습니다!', '닫기', {
      duration: 2000
    });
  }

}
