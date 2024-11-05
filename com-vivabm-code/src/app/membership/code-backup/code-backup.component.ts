import { JsonPipe, NgIf } from '@angular/common';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ICodeResponse } from '@app/interfaces/i-code-response';
import { CodeService } from '@app/services/code.service';
import { HighlightAuto } from 'ngx-highlightjs';
import { DataListComponent } from "../../common/data-list/data-list.component";

@Component({
  selector: 'app-code-backup',
  standalone: true,
  imports: [
    MatButtonModule,
    JsonPipe,
    MatIconModule,
    NgIf,
    HighlightAuto,
    DataListComponent
  ],
  templateUrl: './code-backup.component.html',
  styleUrl: './code-backup.component.scss'
})
export class CodeBackupComponent implements OnInit, AfterViewInit {
  @Input() title = '나의코드 백업';
  @Input() codeCount = 0;

  myId = signal('');

  codeService = inject(CodeService);
  route = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const pararmValue = params.get('id');
      if (pararmValue) {
        this.myId.set(pararmValue);
      }
    });
  }

  myData: string = '';
  backupFileId: number = 0;
  message: string = '';
  fileUrl: string = '';
  isDownloadPossible: boolean = false;
  format: string = '';

  makeBackupCsv() {
    this.codeService.backupCSV(this.myId()).subscribe({
      next: (res: ICodeResponse) => {
        if (res.isSuccess) {
          this.myData = res.data;
          this.isDownloadPossible = res.isSuccess;
          this.fileUrl = res.message;
          this.message = res.message;
          this.format = 'CSV';
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.isDownloadPossible = false;
          this.format = '-';
          this.title = '백업코드 없음';
          this.snackBar.open('백업대상, 등록된 코드가 없습니다.', '확인', { duration: 3000 });
        }
      }
    });
  }
  makeBackupJson() {
    this.codeService.backupJson(this.myId()).subscribe({
      next: (res: ICodeResponse) => {
        if (res.isSuccess) {
          this.myData = res.data;
          this.isDownloadPossible = res.isSuccess;
          this.fileUrl = res.message;
          this.format = 'JSON';
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.isDownloadPossible = false;
          this.format = '-';
          this.title = '백업코드 없음';
          this.snackBar.open('백업대상, 등록된 코드가 없습니다.', '확인', { duration: 3000 });
        }
      }
    });
  }

  ngAfterViewInit(): void { }

  downloadBackupFile(fileUrl: string) {

    this.codeService.createDownloadUrl(fileUrl).subscribe((event) => {
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
}
