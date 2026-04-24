import { Component, computed, effect, ElementRef, inject, input, output, signal, viewChild, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IFileInfo } from '@app/core/interfaces/i-file-info';
import { FileService } from '@app/core/services/file-service';
import { environment } from '@env/environment.development';
import { getFileIcon } from '@app/shared/utilities/helpers';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '../imports/material-imports';
import { Subject } from 'rxjs';
import { RsCode } from '@app/core/enums/rs-code';

@Component({
  selector: 'app-file-uploader',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './file-uploader.html',
  styleUrl: './file-uploader.scss',
})
export class FileUploader {

  readonly fileServer = inject(FileService);
  baseUrl = environment.apiUrl;

  acceptType = input<string>('*/*');
  autoUpload = input<boolean>(true);

  fileUploaded = output<string>();
  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  selectedFile = signal<File | null>(null);
  fileSize: WritableSignal<IFileInfo> = signal({ formatedSize: '0 Bytes', size: 0 });
  errorMessage = signal<string>('');

  isUploading = computed(() => this.fileServer.isUploading());
  uploadProgress = computed(() => this.fileServer.uploadProgress());
  uploadComplete = computed(() => this.fileServer.uploadComplete());

  uploadCompleted = new Subject<string>();
  uploadedFileUrl = toSignal(this.uploadCompleted.asObservable(), { initialValue: null });

  getFileIcon = getFileIcon;

  constructor() {
    // 파일 업로드 완료 시 URL 전달
    effect(() => {
      const url = this.uploadedFileUrl();
      if (url) {
        const fileUrl = `${this.baseUrl}/Files/users/${url}`;
        this.fileUploaded.emit(fileUrl);
        setTimeout(() => {
          this.selectedFile.set(null);
        }, 3_000);
      }
    });
  }

  /**
   * public method : 외부에서 파일 선택 트리거
   */
  public openFilePicker(): void {
    this.fileInput()?.nativeElement.click();
  }

  /**
   * 파일 선택 이벤트
   * @param event
   * @returns
   */
  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const validation = this.fileServer.validateFile(file);
    if (!validation.valid) {
      this.errorMessage.set(validation.error || '유효하지 않은 파일입니다.');
      return;
    }

    this.selectedFile.set(file);
    this.errorMessage.set('');

    const fileInfo: IFileInfo = {
      formatedSize: this.fileServer.formatFileSize(file.size),
      size: file.size
    };
    this.fileSize.set(fileInfo);
    if (this.autoUpload()) {
      this.uploadFile();
    }
  }

  public uploadFile(): void {
    const file = this.selectedFile();
    if (!file) {
      this.errorMessage.set('선택한 파일이 없습니다.');
      return;
    }

    this.errorMessage.set('');

    this.fileServer.uploadFile(file).subscribe({
      next: (res) => {
        if (res && res.rsCode === RsCode.Ok) {
          const fileUrl = res.rsData?.fileName
            ? `${res.rsData.userId}/${res.rsData.fileName}` // userid + fileName
            : null;

          if (fileUrl) {
            this.uploadCompleted.next(fileUrl); // 자신의 Subject 에만 emit
          }
        }
      },
      error: (error) => {
        this.errorMessage.set('업로드 실패');
        console.error(error);
      }
    });
  }

  public clearFile(): void {
    this.selectedFile.set(null);
    this.errorMessage.set('');
    if (this.fileInput()) {
      this.fileInput()!.nativeElement.value = '';
    }
  }
}
