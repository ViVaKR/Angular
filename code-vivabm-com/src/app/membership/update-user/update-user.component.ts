import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IUpdateUserName } from '@app/interfaces/i-update-user-name';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    JsonPipe,
    CommonModule
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit, AfterViewInit, AfterContentChecked {

  updateUserName: IUpdateUserName = {
    email: '',
    newUserName: ''
  } as IUpdateUserName;

  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  cdref = inject(ChangeDetectorRef);
  route = inject(ActivatedRoute);

  constructor() {
    this.cdref.detach();
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //
    });
  }

  ngAfterViewInit(): void {
    this.updateUserName.email = this.authService.getUserDetail()?.email ?? '';
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  router = inject(Router);

  onSubmit() {
    if (!this.updateUserName.email || !this.updateUserName.newUserName) {
      this.snackBar.open('사용자 이름을 변경하려면 이메일과 새 사용자 이름을 입력해야 합니다.', '닫기');
      return;
    }
    this.authService.updateUser(this.updateUserName).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.snackBar.open(`사용자 이름이 변경되었습니다.: ${res.message}`, '닫기');
          this.authService.signOut();
          this.router.navigate(['/SignIn']);
        } else {
          this.snackBar.open(`사용자 이름 변경에 실패했습니다.: ${res.message}`, '닫기');
        }
      },
      error: (err) => {
        this.snackBar.open(err.message, '닫기');
      }
    });
  }
}
