import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterContentInit, Component, inject, Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataListComponent } from '@app/common/data-list/data-list.component';
import { ICode } from '@app/interfaces/i-code';
import { AuthService } from '@app/services/auth.service';
import { CodeService } from '@app/services/code.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-code-read',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterOutlet,
    NgIf,
    NgFor,
    DataListComponent,
    MatSnackBarModule
  ],
  templateUrl: './code-read.component.html',
  styleUrl: './code-read.component.scss'
})
@Injectable({
  providedIn: 'root'
})
export class CodeReadComponent implements OnInit, OnDestroy {

  @Input() mainTitle?: string;
  @Input() currentId?: string;
  @Input() writerId?: string;

  modified!: Date;

  codeService = inject(CodeService);
  authService = inject(AuthService);
  dialog = inject(MatDialog);
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  codes$!: Observable<ICode[]>;

  codeDTO: ICode = {
    id: 0,
    title: '',
    subTitle: '',
    content: '',
    created: new Date(),
    modified: new Date(),
    note: '',
    categoryId: 0
  }

  tabs = ['코드', '코드 설명', '코드 노트', '주석'];
  fontSize = 'text-3xl';

  codeSubscription!: Subscription;
  canDelete: boolean = false;
  codeId!: number;
  canUpdate = false;

  ngOnInit(): void {
    this.authService.isAdmin().subscribe({
      next: (res) => {
        this.canDelete = res;
      }
    });

    this.route.queryParams.subscribe({
      next: (params) => {
        this.codeId = params['id'] as number;
      }
    })
  }

  openDialog(data: any, success: boolean, action: string): void {
    let message = `자료번호 ${data.id} ${action}`;
  }

  onDelete(): void {
    if (!this.authService.isLoggedIn()) {
      let ref = this.snackBar.open('로그인 후 이용하세요.', '로그인', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });

      ref.onAction().subscribe({
        next: () => {
          this.router.navigate(['../login'], { relativeTo: this.route });
        }
      });
      return;
    } else {
      this.delete();
    }
  }

  delete() {

  }

  increaseFontSize(): void {
    this.fontSize = 'text-3xl font-bold';
  }

  opScrollToTop(): void {
    window.scrollTo(0, 0);
  }

  onCopyToClipboard(): void {
    this.snackBar.open('클립보드에 복사되었습니다.', '닫기', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  ngOnDestroy(): void {
    if (this.codeSubscription) {
      this.codeSubscription.unsubscribe();
    }
  }
}
