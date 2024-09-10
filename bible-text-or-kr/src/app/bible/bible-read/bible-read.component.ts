import { ClipboardModule } from '@angular/cdk/clipboard';
import { AsyncPipe, CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioButton } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { IBible } from '@app/interfaces/i-bible';
import { AuthService } from '@app/services/auth.service';
import { BibleService } from '@app/services/bible.service';
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { Observable, Subscription } from 'rxjs';
import { BibleListComponent } from '../bible-list/bible-list.component';
import { DeleteDialogComponent } from '@app/delete-dialog/delete-dialog.component';
import { Testament } from '@app/types/testament';
import { ScrollArrowComponent } from "../../scroll-arrow/scroll-arrow.component";

@Component({
  selector: 'app-bible-read',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterOutlet,
    NgIf,
    NgFor,
    BibleListComponent,
    MatSnackBarModule,
    MatCardModule,
    ClipboardModule,
    HighlightAuto,
    HighlightLineNumbers,
    CurrencyPipe,
    DatePipe,
    MatLabel,
    MatTabsModule,
    MatIconModule,
    MatRadioButton,
    MatButton,
    ScrollArrowComponent
  ],
  templateUrl: './bible-read.component.html',
  styleUrl: './bible-read.component.scss',
  providers: [HighlightAuto, HighlightLineNumbers]
})
export class BibleReadComponent implements OnInit, OnDestroy {

  @Input() mainTitle?: string;
  @Input() currentId?: string;
  @Input() writerId?: string;

  bibleService = inject(BibleService);
  authService = inject(AuthService);
  dialog = inject(MatDialog);
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  codes$!: Observable<IBible[]>;
  testament = Testament
  bibleDTO: IBible = {
    id: 0,
    title: '',
    categoryId: 0,
    chapter: 0,
    verse: 0,
    textKor: '',
    textEng: '',
    comments: '',
    created: new Date(),
    modified: new Date(),
    userId: '',
    userName: '',
    myIp: '',
    category: null
  }

  tabs = ['한글성서', '영문성서', '설명 및 주석'];
  fontSize = 'text-lg';

  codeSubscription!: Subscription;
  canUpdate = false;
  canDelete: boolean = false;
  codeId!: number;
  created!: Date;
  modified!: Date;

  constructor() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {

    this.authService.isAdmin().subscribe({
      next: (res) => {
        this.canDelete = res;
      }
    });

    this.currentId = this.authService.getUserDetail()?.id;
    this.route.queryParams.subscribe({

      next: (params) => {
        this.codeId = params['id'] as number;
        if (this.bibleDTO.id === null || this.bibleDTO.id === undefined) {
          this.bibleDTO.id = 1;
        }

        this.bibleService.getBibleById(this.codeId).subscribe({
          next: (data: IBible) => {
            if (data != null) {
              this.created = new Date(data.created + 'Z');
              this.modified = new Date(data.modified + 'Z');
              this.bibleDTO = data;
              this.writerId = data.userId;
              this.canUpdate = this.currentId === this.writerId;

            }
          },
          error: (err: HttpErrorResponse) => {
            this.snackBar.open(`오류: ${err.status}, ${err.error}`, '닫기', {});

            this.canDelete = false;
            this.canUpdate = false;
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(`오류: ${err.status}, ${err.error}`, '닫기', {});

        this.canDelete = false;
        this.canUpdate = false;
      }
    });
  }

  goNavigateUpdate(id: number) {
    // if (!this.canUpdate) return;
    this.router.navigate(['/Bible/BibleWriteUpdate'], { relativeTo: this.route, queryParams: { id: id } });
  }

  increaseFontSize(): void {
    this.fontSize = 'text-3xl font-bold';
  }

  openDialog(data: any, success: boolean, action: string): void {
    let message = `자료번호 ${data.id} ${action}`;
  }

  onDelete(): void {
    if (!this.canDelete) return;
    if (!this.authService.isLoggedIn()) {
      let ref = this.snackBar.open('로그인 후 이용하세요.', '로그인', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });

      ref.onAction().subscribe({
        next: () => {
          this.router.navigate(['SignIn'], { relativeTo: this.route });
        }
      });
      return;
    } else {
      this.delete();
      // this.dataService.next(this.bibleDTO.id);
    }
  }

  delete() {

    // 성서 삭제 다이얼로그를 띄운다.
    const temp = this.bibleDTO.title;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: this.bibleDTO.id, title: this.bibleDTO.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.codeSubscription = this.bibleService.deleteBible(this.bibleDTO.id).subscribe({
          next: () => {
            this.snackBar.open(`성서 ( ${this.bibleDTO.id} ) 삭제완료 되었습니다.`, `[ ${temp} ] 삭제 완료되었습니다.!`);

            this.bibleService.getBibles().subscribe({
              next: (data: IBible[]) => {
                this.bibleService.next(data);
              }
            });

            this.router.navigate(['../BibleList'], { relativeTo: this.route });

          },
          error: (error: any) => {
            console.log(error);
            this.snackBar.open(`성서 ( ${this.bibleDTO.id} ) 삭제 실패 하였습니다.`, `[ ${temp} ] 삭제 실패!`);
          }
        });
      }
    });
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

  joinArray(arg: any[]): string {
    return arg.join('\n');
  }

  ngOnDestroy(): void {
    if (this.codeSubscription) {
      this.codeSubscription.unsubscribe();
    }
  }
}
