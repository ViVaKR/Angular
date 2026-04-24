import { Component, output, signal, viewChild } from '@angular/core';
import { Uploader } from '@app/shared/uploader/uploader';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';

@Component({
  selector: 'file-manager',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    Uploader
  ],
  templateUrl: './file-manager.html',
  styleUrl: './file-manager.scss',
})
export class FileManager {

  fileUrl = output<string | null>();
  uploader = viewChild<Uploader>('uploader');

  selectedType = signal<string>('image/*');

  acceptTypes = [
    "image/*",
    "video/*",
    "audio/*",
    "application/*",
    ".xlsx, .pptx, .docx",
    ".txt, .csv, .json, .md",
  ]

  onFileUploaded(fileUrl: string): void {
    this.fileUrl.emit(fileUrl);
  }

  uploadFile(type: string) {
    this.selectedType.set(type);
  }
}



/*
사용
export class HomeDocument {
  fileUrl = signal<string | null>(null);

  getUploadedFileUrl(fileUrl: string) {
    this.fileUrl.set(fileUrl);
  }
}
---
<file-manager (fileUrl)="getUploadedFileUrl($event ?? '-')"></file-manager>

@if(fileUrl()) {
<div class="flex justify-center">
  <p class="text-teal-700 text-xs">{{ fileUrl() }} </p>
</div>
}
---

*/
