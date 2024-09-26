import { NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { IUpload } from '@app/interfaces/i-upload';
import { UploadService } from '@app/services/upload.service';
import { environment } from '@env/environment.development';
import { Subscription } from 'rxjs';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf,
    MatLabel,
    MatProgressBarModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {

  baseUrl = environment.baseUrl;
  http = inject(HttpClient);

  @Output() public onUploadFinished = new EventEmitter();
  @Output() public attachFile = new EventEmitter();

  ngOnInit(): void { }

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(`${this.baseUrl}/api/fileManager/uploadFile`, formData, { reportProgress: true, observe: 'events' })
      .subscribe((event) => {
        if (event.type === HttpEventType.Response) {
          this.state.set('파일 업로드 완료');
          this.onUploadFinished.emit(event.body);
        }
      });
  }

  state: WritableSignal<string> = signal('대기중');
  progress: WritableSignal<number> = signal(0);

  file: File | undefined;
  subscription: Subscription | undefined;
  uploadService = inject(UploadService);

  upload: IUpload;
  files: File[];

  onSubmit(files: FileList | undefined) {

    if (files && files.length) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      this.subscription = this.uploadService.upload(formData).subscribe({
        next: async (event) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.upload = { content: null, progress: 0, state: 'PENDING' };
              this.state.set('업로드 중');
              break;
            case HttpEventType.UploadProgress:
              this.upload = { content: null, progress: Math.round((event.loaded / event.total) * 100), state: 'IN_PROGRESS' };
              this.state.set('업로드 중');
              this.progress.set(event.loaded * 100);
              break;
            case HttpEventType.Response:
              this.upload = { content: event.body, progress: 100, state: 'DONE' };
              this.progress.set(100);
              this.state.set((event.body as IFileInfo).dbPath);
              this.attachFile.emit(this.state());
              break;
            default:
              this.upload = { content: null, progress: 0, state: 'PENDING' };
              this.state.set('대기중');
              break;
          }

          if (this.upload.state === 'DONE') {
            this.files = this.upload.content;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.state.set(`업로드 실패: ${err.message}`);
        }
      });
    }
  }

  onDestory() {
    this.subscription?.unsubscribe();
  }
}
