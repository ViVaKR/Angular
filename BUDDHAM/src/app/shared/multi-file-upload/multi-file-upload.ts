import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { allowedContentTypes, getFileIcon } from '@app/shared/utilities/helpers';
import { FileService } from '@app/core/services/file-service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment.development';
import { IFileInfo } from '@app/core/interfaces/i-file-info';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-multi-file-upload',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './multi-file-upload.html',
  styleUrl: './multi-file-upload.scss',
})
export class MultiFileUpload {

  readonly fileService = inject(FileService);

  baseUrl = environment.apiUrl;

  selectedFile = signal<File | null>(null);

  uploadedFile = signal<any>(null);

  getFileIcon = getFileIcon;

  errorMessage = signal<string>('');

  allowed = allowedContentTypes();

  avatarUrl = toSignal(this.fileService.avatarUpdated$, { initialValue: null });

  fileName = toSignal(this.fileService.fileUploaded$, { initialValue: null });

  fileSize: WritableSignal<IFileInfo> = signal({ formatedSize: '0 Bytes', size: 0 });

  onSingleFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedFile.set(file);

    this.errorMessage.set('');

    const fileInfo: IFileInfo = {
      formatedSize: this.fileService.formatFileSize(file.size),
      size: file.size
    };

    this.fileSize.update(() => fileInfo);
  }

  uploadAvatar() {
    const file = this.selectedFile();
    if (!file) {
      this.errorMessage.set('파일이 없습니다.');
      return;
    }
    this.errorMessage.set('');
    this.fileService.upload(file, 2);
  }

  uploadFile() {
    const file = this.selectedFile();
    if (!file) {
      this.errorMessage.set('파일이 없습니다.');
      return;
    }
    this.errorMessage.set('');
    this.fileService.upload(file, 1);
  }
}
