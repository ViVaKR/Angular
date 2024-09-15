import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteAccountRequest } from '@app/interfaces/delete-account-request';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-cancel-membership',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './cancel-membership.component.html',
  styleUrl: './cancel-membership.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CancelMembershipComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);

  hide = signal(true);

  fullName: string = "";
  email: string = "";
  password: string = "";

  deleteAcount!: DeleteAccountRequest;
  title: string = "회원탈퇴";

  ngOnInit(): void {
    this.email = this.authService.getUserDetail()!.email;
    this.fullName = this.authService.getUserDetail()!.fullName;
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  cancelMembership() {
    console.log("cancelMembership");
    this.deleteAcount = {
      email: this.email,
      password: this.password
    }
    this.title = "";
    this.authService.cancelMyAccount(this.deleteAcount).subscribe({
      next: (response) => {
        this.snackBar.open("회원탈퇴가 완료되었습니다.", "확인", {
          duration: 2000,
        });
        this.authService.logout();
        this.router.navigate(["/Home"]);
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open("회원탈퇴에 실패하였습니다.", "확인", {
          duration: 2000,
        });
        this.title = "회원탈퇴";
      }
    });
  }
}
