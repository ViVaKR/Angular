import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, signal, ViewChild, ElementRef, inject, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileManagerService } from '@app/services/file-manager.service';
import { environment } from '@env/environment.development';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize, Subscription } from 'rxjs';

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

  baseURL = environment.baseURL;

  requiredFileType!: string;

  fileName = '';
  uploadProg!: number;
  uploadSub!: Subscription;
  translate = inject(TranslateService);
  constructor() {
    // this.translate.use('ko-KR');
    // this.translate.setDefaultLang('ko-KR');
    // this.translate.addLangs(['ko', 'en']);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);

      const upload$ = this.http.post(`${this.baseURL}/api/sutraimage`, formData, {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        finalize(() => this.reset())
      );

      this.uploadSub = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProg = Math.round(100 * (event.loaded / event.total!));
        }
      })
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress.set(0);
    this.uploadSub = new Subscription();
  }

  snackBar = inject(MatSnackBar);
  imageName = signal('');
  fileSize = signal(0);
  uploadProgress = signal(0);
  imagePreview = signal('');

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  cdref = inject(ChangeDetectorRef);

  // Handler for file input change
  onFileChange(event: any): void {
    const file = event.target.files[0] as File | null;
    this.uploadFile(file);
  }

  // Handler for file drop
  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0] as File | null;
    this.uploadFile(file);
  }

  // Prevent default dragover behavior
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  http = inject(HttpClient);
  fileManagerService = inject(FileManagerService);
  baseUrl = environment.baseURL;

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


  uploadToAPI(file: File): void {

    const formData = new FormData();

    formData.append('file', file, file.name);

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
              this.setMessage = `3. DownloadProgress: Downloaded! ${this.setProgress}% <===> ${event.loaded}`;
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
      })
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
      this.uploadToAPI(file);
      this.uploadSuccess = true;
      this.uploadError = false;
      this.imageName.set(file.name);


    } else {
      this.uploadSuccess = false;
      this.uploadError = true;
      this.snackBar.open('Please select a valid image file', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']

      });
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imageName.set('');
    this.fileSize.set(0);
    this.uploadSuccess = false;
    this.uploadError = false;
    this.uploadProgress.set(0);
  }
}
