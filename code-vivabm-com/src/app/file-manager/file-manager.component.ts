import { CommonModule, NgIf } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { CodeService } from '@app/services/code.service';
import { FileManagerService } from '@app/services/file-manager.service';
import { environment } from '@env/environment.development';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NgIf,
    MatProgressBarModule,
    TranslateModule,
  ],
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.scss'
})
export class FileManagerComponent {

  @Input() public title: string = '프로필 사진 (drag & drop)';
  @Input() public choice: number = 0; // 0: Account, 1: WriteUpdate

  @Output() public onLoadFinished = new EventEmitter(); // Account Avata Image
  @Output() public onAttachImageFinished = new EventEmitter(); // WriteUpdate Attach Image

  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  baseUrl = environment.baseUrl;
  requiredFileType!: string;
  fileName = '';
  uploadProg!: number;
  uploadSub!: Subscription;

  fileManagerService = inject(FileManagerService);
  codeService = inject(CodeService);
  snackBar = inject(MatSnackBar);
  cdref = inject(ChangeDetectorRef);
  translate = inject(TranslateService);

  imageName: WritableSignal<String> = signal('');
  uploadFileName: WritableSignal<String> = signal(''); // 파일 업로드시 파일명

  fileSize: WritableSignal<number> = signal(0);
  uploadProgress: WritableSignal<number> = signal(0);
  imagePreview: WritableSignal<String> = signal('');
  message: WritableSignal<IFileInfo> = signal({ dbPath: '', fullPath: '', fileSize: 0 });

  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  profilePhoto: String = 'login-icon.png';

  constructor() {
    this.codeService.hideElement(true);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0] as File | null;
    if (file && file.type.startsWith('image/'))
      this.uploadFile(file);
  }

  uploadFile(file: File | null | undefined): void {

    if (file === null || file === undefined) {
      this.uploadSuccess = false;
      this.uploadError = true;
      this.snackBar.open('파일을 선택하지 않았습니다.', '닫기');
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.uploadSuccess = false;
      this.uploadError = true;
      this.snackBar.open('이미지 파일만 가능합니다.', '닫기');
      return;
    }

    this.selectedFile = file;
    this.fileSize.set(Math.round(file.size / 1024));
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result as string;
      this.imagePreview.set(image.src);
      image.onload = () => { }
    };

    reader.readAsDataURL(file); // read file as data url
    this.uploadSuccess = true;
    this.uploadError = false;
    this.imageName.set(file.name);
    this.uploadToAPI(file);
  }


  uploadToAPI(file: File) {

    const formData = new FormData();
    formData.append('file', file, file.name);

    this.fileManagerService.postFile(formData, this.choice).subscribe({
      next: (event: HttpEvent<IFileInfo>) => {

        if (this.choice === 0) {
          switch (event.type) {
            case HttpEventType.Response:
              this.uploadSuccess = true;
              this.uploadError = false;
              this.message.set(event.body as IFileInfo);
              this.onLoadFinished.emit(event.body as IFileInfo);
              this.fileManagerService.nextAvata(event.body as IFileInfo);
              break;
          }
        }
        else {
          switch (event.type) {
            case HttpEventType.Response:
              this.uploadSuccess = true;
              this.uploadError = false;
              this.onAttachImageFinished.emit(event.body.dbPath);
              break;
          }
        }

      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open('파일 업로드에 실패했습니다. ' + err.message, '닫기');
      }
    });

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
    if (this.uploadSub) this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress.set(0);
    this.uploadSub = new Subscription();
  }
}
