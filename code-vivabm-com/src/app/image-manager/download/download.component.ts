import { JsonPipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { FileManagerService } from '@app/services/file-manager.service';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [
    MatButtonModule,
    JsonPipe
  ],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss'
})
export class DownloadComponent implements OnInit {

  fileService = inject(FileManagerService);
  message = signal('');
  progress = signal(0);

  ngOnInit(): void { }

  fileList: WritableSignal<string[]> = signal([]);

  getFileList() {

    this.fileService.getFileList().subscribe((res) => {
      this.fileList.set(res);
    });

  }

  download(fileUrl: string) {

    this.fileService.download(fileUrl).subscribe((event) => {
      if (event.type === HttpEventType.Response) {
        this.message.set('Download complete');
        this.downloadFile(event, fileUrl);
      }
    });
  }

  downloadFile(data: HttpResponse<Blob>, fileUrl: string) {
    const downloadFile = new Blob([data.body], { type: data.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileUrl;
    a.href = URL.createObjectURL(downloadFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

  createImgPath(photo: string) {
    return `https://api.vivabm.com/images/${photo}`;
  }
}
