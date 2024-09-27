import { ClipboardModule } from '@angular/cdk/clipboard';
import { AsyncPipe, CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioButton } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataListComponent } from '@app/common/data-list/data-list.component';
import { DeleteDialogComponent } from '@app/common/delete-dialog/delete-dialog.component';
import { ICode } from '@app/interfaces/i-code';
import { AuthService } from '@app/services/auth.service';
import { CodeService } from '@app/services/code.service';
import { DataService } from '@app/services/data.service';
import { FileManagerService } from '@app/services/file-manager.service';
import { environment } from '@env/environment.development';
// import { DataService } from '@app/services/data.service';
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
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
    MatButton
  ],
  templateUrl: './code-read.component.html',
  styleUrl: './code-read.component.scss',
  providers: [HighlightAuto, HighlightLineNumbers]
})
@Injectable({
  providedIn: 'root'
})
export class CodeReadComponent implements OnInit, AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {

  }


  @Input() mainTitle?: string;
  @Input() currentId?: string;
  @Input() writerId?: string;

  codeService = inject(CodeService);
  authService = inject(AuthService);
  dialog = inject(MatDialog);
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  dataService = inject(DataService);

  codes$!: Observable<ICode[]>;

  codeDTO: ICode = {
    id: 0,
    title: '',
    subTitle: '',
    content: '',
    created: new Date(),
    modified: new Date(),
    note: '',
    categoryId: 0,
    userId: '',
    userName: '',
    myIp: '',
    attachFileName: '',
    attachImageName: ''
  }

  tabs = ['코드', '코드 노트'];
  fontSize = 'text-lg';

  codeSubscription!: Subscription;
  canDelete: boolean = false;
  codeId!: number;
  canUpdate = false;
  created!: Date;
  modified!: Date;

  ngOnInit(): void {

    this.authService.isAdmin().subscribe({
      next: (res) => {
        this.isAdmin = res;
      },
      error: (err) => {
        this.isAdmin = false;
      }
    });

    this.currentId = this.authService.getUserDetail()?.id;

    this.route.queryParams.subscribe({

      next: (params) => {
        this.codeId = params['id'] as number;
        if (this.codeDTO.id === null || this.codeDTO.id === undefined) {
          this.codeDTO.id = 1;
        }

        this.codeService.getCodeById(this.codeId).subscribe({
          next: (data: ICode) => {
            if (data != null) {
              this.created = new Date(data.created + 'Z');
              this.modified = new Date(data.modified + 'Z');
              this.codeDTO = data;
              this.writerId = data.userId;
              this.canUpdate = this.currentId === this.writerId;
              this.canDelete = this.currentId === this.writerId;
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

  baseUrl = environment.baseUrl;
  getAttachImage() {
    if (this.codeDTO.attachImageName === '' || this.codeDTO.attachImageName === null || this.codeDTO.attachImageName === undefined) {
      return `no-image.svg`;
    }
    return `${this.baseUrl}/images/Attach/${this.codeDTO.attachImageName}`;
  }

  goNavigateUpdate(id: number) {
    if (!this.canUpdate) return;
    this.router.navigate(['../CodeUpdate'],
      {
        relativeTo: this.route,
        queryParams: { id }
      });
  }

  increaseFontSize(): void {
    this.fontSize = 'text-3xl font-bold';
  }

  openDialog(data: any, success: boolean, action: string): void {
    let message = `자료번호 ${data.id} ${action}`;
  }

  isAdmin: boolean = false;
  onDelete(): void {

    // this.authService.isAdmin().subscribe({
    //   next: (res) => {
    //     this.canDelete = res;
    //   }
    // });
    const admin = this.authService.isAdmin();
    const login = this.authService.isLoggedIn();
    const writer = this.authService.getUserDetail()?.id === this.codeDTO.userId;

    if (!login) {
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
      if (admin) {
        this.delete();
        this.dataService.next(this.codeDTO.id);
      } else if (writer) {

        this.delete();
        this.dataService.next(this.codeDTO.id);
      } else {
        let ref = this.snackBar.open('작성자만 삭제할 수 있습니다.', '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        return;
      }
    }
  }

  delete() {

    // 경전 삭제 다이얼로그를 띄운다.
    const temp = this.codeDTO.title;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: this.codeDTO.id, title: this.codeDTO.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.codeSubscription = this.codeService.deleteCode(this.codeDTO.id).subscribe({
          next: () => {
            this.snackBar.open(`경전 ( ${this.codeDTO.id} ) 삭제완료 되었습니다.`, `[ ${temp} ] 삭제 완료되었습니다.!`);

            this.codeService.getCodes().subscribe({
              next: (data: ICode[]) => {
                this.codeService.next(data);
              }
            });

            this.router.navigate(['../CodeList'], { relativeTo: this.route });

          },
          error: (error: any) => {
            console.log(error);
            this.snackBar.open(`경전 ( ${this.codeDTO.id} ) 삭제 실패 하였습니다.`, `[ ${temp} ] 삭제 실패!`);
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

  fileService = inject(FileManagerService);

  downloadCodeFile(fileUrl: string) {
    this.fileService.downloadCodeFile(fileUrl).subscribe((event) => {
      if (event.type === HttpEventType.Response) {
        this.downloadFile(event, fileUrl);
      }
    });
  }

  downloadFile(data: HttpResponse<Blob>, fileUrl: string) {
    const downloadFile = new Blob([data.body], { type: data.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileUrl;
    a.href = URL.createObjectURL(downloadFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }



  ngOnDestroy(): void {
    if (this.codeSubscription) {
      this.codeSubscription.unsubscribe();
    }
  }
}
