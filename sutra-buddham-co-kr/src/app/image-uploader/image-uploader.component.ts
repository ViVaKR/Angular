import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, signal, ViewChild, ElementRef, inject, EventEmitter, Output, ChangeDetectorRef, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileManagerService } from '@app/services/file-manager.service';
import { environment } from '@env/environment.development';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NgIf,
    TranslateModule,
    MatProgressBarModule
  ],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'

})
export class ImageUploaderComponent {

  @Output() public onUploadFinished = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  baseUrl = environment.baseURL;
  requiredFileType!: string;
  fileName = '';
  uploadProg!: number;
  uploadSub!: Subscription;

  http = inject(HttpClient);
  fileManagerService = inject(FileManagerService);
  snackBar = inject(MatSnackBar);
  cdref = inject(ChangeDetectorRef);
  translate = inject(TranslateService);

  imageName: WritableSignal<String> = signal('');
  fileSize: WritableSignal<number> = signal(0);
  uploadProgress: WritableSignal<number> = signal(0);
  imagePreview: WritableSignal<String> = signal('');
  message: WritableSignal<String> = signal('');

  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  profilePhoto: String = 'login-icon.png';

  onFileChange(event: any): void {
    const file = event.target.files[0] as File | null;
    if (file && file.type.startsWith('image/'))
      this.uploadFile(file);
  }

  uploadFile(file: File | null): void {
    //
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;

      // Set file size in KB
      this.fileSize.set(Math.round(file.size / 1024));

      const reader = new FileReader();

      reader.onload = (e) => {
        // Set image preview URL
        const image = new Image();
        image.src = e.target?.result as string;
        this.imagePreview.set(image.src);

        image.onload = (x) => {
          // Set image dimensions
        }
      };

      reader.readAsDataURL(file);

      this.uploadToAPI(file); // API 업로드

      this.uploadSuccess = true;
      this.uploadError = false;
      this.imageName.set(file.name);

    } else {
      this.uploadSuccess = false;
      this.uploadError = true;
      this.snackBar.open('잘못된 파일입니다!', '닫기', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  uploadToAPI(file: File): void {

    const formData = new FormData();
    formData.append('file', file, file.name);
    const response: any = this.http.post<any>(`${this.baseUrl}/api/sutraimage`, formData, { reportProgress: true, observe: 'events' });

    response.subscribe({
      next: (event: any) => {

        switch (event.type) {
          case HttpEventType.Sent:
            this.uploadProgress.set(0);
            this.message.set('Sent: ' + event.type);
            break;
          case HttpEventType.UploadProgress:
            {
              this.uploadProgress.set(event.loaded);
              this.message.set(`${this.uploadProgress}%`);
            }
            break;
          case HttpEventType.DownloadProgress:
            this.uploadProgress.set(event.loaded);
            this.message.set(`${this.uploadProgress}%`);
            break;
          case HttpEventType.Response:
            {
              this.onUploadFinished.emit(event.body);
              setTimeout(() => {
                let res = event.body as { dbPath: '' };
                this.uploadProgress.set(100);
                this.message.set(res.dbPath);
              }, 1500);
            }
        }
      },
      error: (err: HttpErrorResponse) => {
        this.message.set(`오류: ${err.message}, ${err.error}`);
      },
    })
  }

  // Handler for file drop
  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0] as File | null;
    this.uploadFile(file);
  }

  // Prevent default dragover behavior
  // 드레그 오버 이벤트를 막아서 파일을 브라우저에 띄우지 않도록 함
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imageName.set('');
    this.fileSize.set(0);
    this.uploadSuccess = false;
    this.uploadError = false;
    this.uploadProgress.set(0);
  }

  cancelUpload() {
    if (this.uploadSub)
      this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress.set(0);
    this.uploadSub = new Subscription();
  }
}
