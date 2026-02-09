import { CommonModule } from '@angular/common';
import {
  Component, computed, DestroyRef, ElementRef,
  inject, input, output, signal, viewChild
} from '@angular/core';
import { environment } from '@env/environment.development';
import { MATERIAL_COMMON } from '../imports/material-imports';
import { RsCode } from '@app/core/enums/rs-code';
import { FileUploadService } from '@app/core/services/file-upload-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'uploader',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './uploader.html',
  styleUrl: './uploader.scss',
})
export class Uploader {

  readonly fileUploadServer = inject(FileUploadService);
  readonly baseUrl = environment.apiUrl;

  acceptType = input<string>('*/*');
  autoUpload = input<boolean>(true);

  fileUploaded = output<string>();

  private destroyRef = inject(DestroyRef);

  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  errorMessage = signal<string>('');
  selectedFile = signal<File | null>(null);

  isUploading = computed(() => this.fileUploadServer.isUploading());
  uploadProgress = computed(() => this.fileUploadServer.uploadProgress());
  uploadComplete = computed(() => this.fileUploadServer.uploadComplete());

  public openFilePicker(): void {
    this.fileInput()?.nativeElement.click();
  }

  async onFileSelected(event: Event): Promise<{ valid: boolean, error?: string }> {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return { valid: false, error: '잘못된 파일 선택입니다.' }

    const validation = this.fileUploadServer.validateFile(file);

    if (!validation.valid) {
      this.errorMessage.set(validation.error || '유효하지 않은 파일 형식입니다.');
      return { valid: false, error: '유효하지 않은 파일 형식입니다.' }
    }

    if (file.type === 'image/svg+xml') {
      const result = await this.fileUploadServer.validateSvgFile(file);
      if (!result.valid)
        return result;
    }

    this.selectedFile.set(file);
    this.errorMessage.set('');

    if (this.autoUpload()) await this.upload();

    return { valid: true };

  }

  async uploadFile(): Promise<boolean> {
    const file = this.selectedFile();
    if (!file) {
      this.errorMessage.set('선택된 파일이 없습니다.');
      return false;
    }
    this.errorMessage.set('');
    this.fileUploadServer.uploadSharedFile(file).subscribe({
      next: (response) => {
        if (response && response.rsCode === RsCode.Ok) {
          const fileUrl = response.rsData?.fileUrl || '';
          this.fileUploaded.emit(fileUrl); // 부모에게 URL 전달
        }
        return true;
      },
      error: (err) => {
        this.errorMessage.set('업로드 중 오류가 발생했습니다: ' + err);
        return false;
      }
    });

    return true;
  }



  async upload(): Promise<boolean> {

    const file = this.selectedFile();

    if (!file) {
      this.errorMessage.set('선택된 파일이 없습니다.');
      return false;
    }

    this.errorMessage.set('');

    this.fileUploadServer.uploadSharedFile(file).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res?.rsCode === RsCode.Ok) {
            this.fileUploaded.emit(res.rsData?.fileUrl ?? '');
          }
        },
        error: (err) => {
          this.errorMessage.set(`업로드 중 오류가 발생했습니다.: ${err}`);
        }
      });
    return true;
  }
}
