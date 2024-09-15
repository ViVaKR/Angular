import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { SignOutComponent } from './sign-out/sign-out.component';
import { AuthService } from '@app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { BibleService } from '@app/services/bible.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    JsonPipe,
    RouterOutlet,
    RouterModule,
    SignOutComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  authServices = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  bibleService = inject(BibleService);

  id!: string;

  confirmed = false;
  menus: { URL: string, Name: string }[] = [
    { URL: "/Profile/Account", Name: '회원정보' },
    { URL: "/Profile/MyBible", Name: '나의성서 쓰기' },
    { URL: "/Profile/ConfirmEmail", Name: '미인증 메일' },
    { URL: `/Profile/ChangePassword`, Name: '비밀번호 변경' },
    { URL: `/Profile/UpdateUser`, Name: '나의이름 변경' },
    { URL: `/Profile/Cancel`, Name: '회원탈퇴' },
  ];

  ngOnInit(): void {
    this.bibleService.isElement.next(true);
    this.activatedRoute.queryParamMap.subscribe(params => {
      const pararmValue = params.get('id');
      if (pararmValue) {
        this.id = pararmValue;
      }
    });

    this.authServices.getDetail().subscribe({
      next: (result) => {
        if (result.emailConfirmed) {
          this.confirmed = true;
          this.menus = [
            { URL: "/Profile/Account", Name: '회원정보' },
            { URL: "/Profile/MyBibleList", Name: '성경필사 목록' },
            { URL: "/Profile/MyBible", Name: '나의성경 쓰기' },
            { URL: `/Profile/ChangePassword`, Name: '비밀번호 변경' },
            { URL: `/Profile/UpdateUser`, Name: '나의이름 변경' },
            { URL: `/Profile/Cancel`, Name: '회원탈퇴' },
          ];
        } else {
          this.confirmed = false;
          this.menus = [
            { URL: "/Profile/Account", Name: '회원정보' },
            { URL: "/Profile/ConfirmEmail", Name: '이메일 인증' },
            { URL: `/Profile/ChangePassword`, Name: '비밀번호 변경' },
            { URL: `/Profile/UpdateUser`, Name: '나의이름 변경' },
            { URL: `/Profile/Cancel`, Name: '회원탈퇴' },
          ];
        }
      },
      error: (err: HttpErrorResponse) => {
        this.confirmed = false;
        this.menus = [];
        this.router.navigate(['/SignIn']);
        this.snackBar.open(err.message, 'Close', {
          duration: 10000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    });
  }

  goTo(URL: string, id: string) {
    this.router.navigate([URL], { queryParams: { id: id } });
  }
}
