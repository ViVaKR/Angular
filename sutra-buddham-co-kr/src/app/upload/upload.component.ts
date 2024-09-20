import { HttpClient, HttpEventType, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Component, inject, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { environment } from '@env/environment.development';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {

  baseUrl = environment.baseURL;

  cdref = inject(ChangeDetectorRef);
  progress!: number;

  set setProgress(value: number) {
    this.progress = value;
    this.cdref.detectChanges();
  }

  message: string = '';
  set setMessage(value: string) {
    this.message = value;
    this.cdref.detectChanges();
  }

  @Output() public onUploadFinished = new EventEmitter();

  http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
    // this.cdref.detach();
  }

  /// 파일 업로드
  uploadFile = (files: any) => {
    if (files.length === 0) return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();

    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(`${this.baseUrl}/api/sutraimage`, formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {

          switch (event.type) {
            case HttpEventType.Sent:
              this.setMessage = '0. Sent: Request has been made!';
              break;
            case HttpEventType.ResponseHeader:
              this.setMessage = '2. ResponseHeader: Response header has been received!';
              break;
            case HttpEventType.UploadProgress:
              this.setProgress = Math.round(event.loaded);
              this.setMessage = `1. UploadProgress: Uploaded! ${this.setProgress}%`;
              break;

            case HttpEventType.DownloadProgress:
              this.setProgress = Math.round(event.loaded);
              this.setMessage = `3. DownloadProgress: Downloaded! ${this.setProgress}% ${event.loaded}`;
              break;
            case HttpEventType.Response:
              {
                this.onUploadFinished.emit(event.body);
                setTimeout(() => {
                  this.setMessage = '파일 업로드 완료: ' + event.statusText;
                  this.setProgress = 100;
                }, 1500);
              }
          }
        },
        error: (err: HttpErrorResponse) => {
          this.message = `오류: ${err.message}, ${err.error}`;
        },
      });
  }

}
