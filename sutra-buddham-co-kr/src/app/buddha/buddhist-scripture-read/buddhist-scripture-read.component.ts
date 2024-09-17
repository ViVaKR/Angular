import { AfterContentInit, Component, inject, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { HighlightAuto } from 'ngx-highlightjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BuddhaService } from '@app/services/buddha.service';
import { BuddistScripture } from '@app/types/buddist-scripture';
import { HangulOrder } from '@app/types/hangul-order';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
import { DialogVivComponent } from '@app/common/dialog-viv/dialog-viv.component';
import { CurrencyPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services/auth.service';
import { DataService } from '@app/services/data.service';
import { DeleteDialogComponent } from '@app/common/delete-dialog/delete-dialog.component';
import { ScrollArrowComponent } from '@app/common/scroll-arrow/scroll-arrow.component';
import { HttpErrorResponse } from '@angular/common/http';
import { IResponse } from '@app/interfaces/i-response';
import { Sutra } from '@app/models/sutra';
@Component({
  selector: 'app-buddhist-scripture-read',
  standalone: true,
  imports: [
    AllMatModule,
    HighlightAuto,
    HighlightLineNumbers,
    ClipboardModule,
    JsonPipe,
    NgIf,
    DatePipe,
    CurrencyPipe,
    ScrollArrowComponent
  ],
  templateUrl: './buddhist-scripture-read.component.html',
  styleUrl: './buddhist-scripture-read.component.scss',
  providers: [HighlightAuto, HighlightLineNumbers,
    { provide: 'LOCALE_ID', useValue: 'ko-KR' }
  ],
})
@Injectable({
  providedIn: 'root'
})
export class BuddhistScriptureReadComponent implements OnInit, OnDestroy {

  @Input() mainTitle?: string;
  @Input() currentId?: string;
  @Input() sutraWriterId?: string;

  created!: Date;

  dataService = inject(DataService);

  sutraDTO: Sutra = {
    id: 0,
    title: '',
    subtitle: '',
    author: '',
    translator: '',
    summary: '',
    text: '',
    originalText: '',
    annotation: '',
    hangulOrder: HangulOrder.가,
    created: new Date(),
    userId: '',
    userName: ''
  }

  tabs = ['경전', '원문', '해설', '주석'];

  fontSize = 'text-3xl';

  sutraSubscription!: Subscription;

  authService = inject(AuthService);

  canDelete = false;
  canUpdate = false;
  isHideArrow: boolean = false;

  constructor(
    private router: Router,
    private service: BuddhaService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.authService.isAdmin().subscribe({
      next: (res) => {
        this.canDelete = res;
      }
    });

    this.currentId = this.authService.getUserDetail()?.id;

    // 파라미터를 받아오기 위해 ActivatedRoute를 사용한다.
    this.route.queryParams.subscribe({

      next: (params: Params) => {

        this.sutraDTO.id = params['id'] as number; // id 파라미터를 받아온다.

        if (this.sutraDTO.id === null || this.sutraDTO.id === undefined)
          this.sutraDTO.id = 1; // id가 없으면 1로 초기화한다.

        this.service.getScriptureById(this.sutraDTO.id).subscribe({ // id로 서버에 요청한다.
          next: (res: IResponse) => {
            if (res.success) {
              this.created = new Date(res.data.created);
              this.sutraDTO = res.data;
              this.sutraWriterId = res.data.userId;
              this.canUpdate = this.currentId === this.sutraWriterId;
            }
          },
          error: (err: IResponse) => {
            this.openSnackBar(`오류: ${err.message} ${err.data}`, '실패');
            this.canDelete = false;
            this.canUpdate = false;
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.openSnackBar(`오류: ${error.message}`, '실패');
        this.canDelete = false;
        this.canUpdate = false;
      }
    });
  }

  // 경전 삭제
  onDelete() {

    if (!this.authService.isLoggedIn()) {

      this.openSnackBar('로그인이 필요합니다.', '로그인');
      this.router.navigate(['../login'], { relativeTo: this.route });

    } else {
      this.delete();
      this.dataService.next(this.sutraDTO.id);
    }
  }

  delete() {

    // 경전 삭제 다이얼로그를 띄운다.
    const temp = this.sutraDTO.title;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: this.sutraDTO.id, title: this.sutraDTO.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.sutraSubscription = this.service.deleteScripture(this.sutraDTO.id).subscribe({
          next: () => {
            this.openSnackBar(`경전 ( ${this.sutraDTO.id} ) 삭제완료 되었습니다.`, `[ ${temp} ] 삭제 완료되었습니다.!`);

            this.service.getSutras().subscribe({
              next: (sutras: Sutra[]) => {
                this.service.next(sutras);
              },
              error: (error: HttpErrorResponse) => {
                this.openSnackBar('경전 삭제 실패: ' + error.message, 'Error');
              }
            });
            this.router.navigate(['Buddha']);
          },
          error: (error: any) => {
            this.openSnackBar(`경전 ( ${this.sutraDTO.id} ) 삭제 실패 하였습니다.`, `[ ${temp} ] 삭제 실패!`);
          }
        });
      }
    });
  }

  goNavigateUpdate(id: number) {
    this.router.navigate(['../BuddhistScriptureUpdate'], { relativeTo: this.route, queryParams: { id } });
  }

  increaseFontSize() {
    this.fontSize = 'text-3xl font-bold';
  }

  openDialog(data: any, success: boolean, action: string) {
    let message = `자료번호 ( ${data.id} ) 데이터 ${action} `;

    let dialogRef = success
      ? this.dialog.open(DialogVivComponent, { data: { name: `${message}` } })
      : this.dialog.open(DialogVivComponent, { data: { name: `${message}` } });

    dialogRef.afterClosed().subscribe(() => {
      // this.reloadComponent();
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onScrollToTop() {
    window.scrollTo(0, 0);
  }

  // 클립보드에 복사한다.
  onCopyToClipboard() {
    this.openSnackBar('경전 본문이 클립보드에 복사 완료되었습니다.', '복사완료!');
  }

  ngOnDestroy(): void {
    if (this.sutraSubscription) {
      this.sutraSubscription.unsubscribe();
    }
    this.service.hideElement(false);
  }
}
