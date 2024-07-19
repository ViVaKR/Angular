import { Component, inject, output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss'
})
export class SignOutComponent {
  title = 'Sign Out';
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  signOut() {
    this.authService.logout();
    let ref = this.snackBar.open('로그아웃 되었습니다.', '닫기', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    ref.onAction().subscribe(() => {
      ref.dismiss();
      this.router.navigate(['/Home']);
    });
  }
}
