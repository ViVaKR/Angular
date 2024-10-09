import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { SignOutComponent } from './sign-out/sign-out.component';
import { AuthService } from '@app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { CodeService } from '@app/services/code.service';
import { LoadingService } from '@app/services/loading.service';

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
export class ProfileComponent implements OnInit, AfterViewInit {

  authServices = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  codeService = inject(CodeService);

  id!: string;

  confirmed = false;
  menus: { URL: string, Name: string }[] = [
    { URL: '/Profile/Account', Name: '회원정보' },
    { URL: '/Profile/MyCode', Name: '코드작성' },
    { URL: '/Profile/ConfirmEmail', Name: '미인증 메일' },
    { URL: '/Profile/ChangePassword', Name: '비밀번호 변경' },
    { URL: '/Profile/UpdateUser', Name: '필명변경' },
    { URL: '/Profile/Cancel', Name: '회원탈퇴' },
  ];
  loadingService = inject(LoadingService);
  ngAfterViewInit(): void {

    this.codeService.isElement.next(true);
  }

  ngOnInit(): void {
    this.loadingService.loadingOff();
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
            { URL: '/Profile/Account', Name: '회원정보' },
            { URL: '/Profile/MyCode', Name: '코드작성' },
            { URL: '/Profile/ChangePassword', Name: '비밀번호 변경' },
            { URL: '/Profile/UpdateUser', Name: '필명변경' },
            { URL: '/Profile/CodeBackup', Name: '코드백업' },
            { URL: '/Profile/Cancel', Name: '회원탈퇴' },
          ];
        } else {
          this.confirmed = false;
          this.menus = [
            { URL: '/Profile/Account', Name: '회원정보' },
            { URL: '/Profile/ConfirmEmail', Name: '이메일 인증' },
            { URL: '/Profile/ChangePassword', Name: '비밀번호 변경' },
            { URL: '/Profile/UpdateUser', Name: '필명변경' },
            { URL: '/Profile/Cancel', Name: '회원탈퇴' },
          ];
        }
      },
      error: (err: HttpErrorResponse) => {
        this.confirmed = false;
        this.menus = [];
        this.router.navigate(['/SignIn']);
        this.snackBar.open(err.message, '닫기', {
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
