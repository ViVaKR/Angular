import { CommonModule, NgIf } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { FileManagerService } from '@app/services/file-manager.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NgIf,
    MatProgressBarModule,
    TranslateModule
  ],
  templateUrl: './image-manager.component.html',
  styleUrl: './image-manager.component.scss'
})
export class ImageManagerComponent implements OnInit {

  @Input() public title: string = '프로필 사진 (drag & drop)';
  @Output() public onUpLoadFinished = new EventEmitter();

  choice: number = 0; // 0: Account, 1: WriteUpdate
  snackBar = inject(MatSnackBar);
  fileManagerService = inject(FileManagerService);
  profilePhoto: string = 'avata.svg';
  uploadSub!: Subscription;
  message: WritableSignal<IFileInfo> = signal({ dbPath: '', fullPath: '', fileSize: 0 });
  uploadProgress: WritableSignal<number> = signal(0);
  fileSize: WritableSignal<number> = signal(0);
  imagePreview: WritableSignal<string> = signal('');
  imageName: WritableSignal<string> = signal('');
  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.imagePreview.set('avata.svg');
  }

  /// (1) 파일 선택
  onFileChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    const files = target.files; // 파일 목록을 가져옵니다.
    if (files && files.length > 0) {
      this.uploadFile(files[0]);
    }
  }

  /// (2)
  uploadFile(file: File) {
    if (file === null || file === undefined) {
      this.uploadSuccess = false;
      this.uploadError = true;
      return;
    }

    if (file.size > 1024 * 1024 * 30) {
      this.uploadSuccess = false;
      this.uploadError = true;
      alert('30MB 이하의 파일만 업로드 가능합니다.');
      return;
    }

    if (!file.type.includes('image')) {
      this.uploadSuccess = false;
      this.uploadError = true;
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    this.selectedFile = file;
    this.fileSize.set(file.size);
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
  }

  uploadToAPI(file: File) {

    const formData = new FormData();
    formData.append('file', file, file.name);
    this.fileManagerService.postFile(formData, this.choice).subscribe({
      next: (event: HttpEvent<IFileInfo>) => {

        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress.set(Math.round(event.loaded));
        }
        else if (event.type === HttpEventType.Response) {
          this.uploadSuccess = true;
          this.uploadError = false;
          this.message.set(event.body as IFileInfo);
          this.onUpLoadFinished.emit(event.body as IFileInfo);
          this.fileManagerService.nextAvata(event.body as IFileInfo);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open('파일 업로드에 실패했습니다. ' + err.message, '닫기');
      }
    });
  }

  onFileDrop($event: DragEvent) {
    $event.preventDefault(); // 파일을 드롭할 때 기본 동작을 막습니다.
    const files = $event.dataTransfer.files; // 드롭된 파일 목록을 가져옵니다.
    if (files.length > 0) {
      this.uploadFile(files[0] as File); // 첫 번째 파일을 선택합니다.
    }
  }

  onDragOver($event: DragEvent) {
    $event.preventDefault(); // 파일을 드래그할 때 기본 동작을 막습니다.
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
