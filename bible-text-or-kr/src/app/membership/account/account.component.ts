import { AfterViewInit, Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { environment } from '@env/environment.development';
import { ImageUploaderComponent } from "../../image-uploader/image-uploader.component";
import { FileManagerService } from '@app/services/file-manager.service';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgFor,
    JsonPipe,
    MatDividerModule,
    ImageUploaderComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements AfterViewInit {

  baseUrl = environment.baseUrl;
  fileInfo: IFileInfo = { dbPath: '', fullPath: '' };
  imagePath: WritableSignal<string> = signal('/login-icon.png');
  authService = inject(AuthService);
  account$ = this.authService.getDetail();
  fileService = inject(FileManagerService);

  ngAfterViewInit(): void {

    this.fileService.getUserImage().subscribe({
      next: (response: IFileInfo) => {
        if (response.dbPath === null || response.dbPath === '' || response.dbPath === undefined || response.dbPath === '-') {
          this.imagePath.set('/login-icon.png');
          return;
        }
        this.fileInfo = response;
        this.imagePath.set(this.createImagePath(`${this.authService.getUserDetail()?.id}_${response.dbPath}`));
      }
    }
    );
  }

  createImagePath(fileName: string | null | undefined) {
    if (fileName === null || fileName === '' || fileName === undefined)
      return '/login-icon.png';

    return `${this.baseUrl}/images/${fileName}`;
  }

  uploadFinisted($event: IFileInfo) {
    this.fileInfo = $event;
  }
  onLoadFinished($event: IFileInfo) {

    if ($event.dbPath === null || $event.dbPath === '' || $event.dbPath === undefined || $event.dbPath === '-')
      this.imagePath.set('/login-icon.png');
    this.imagePath.set(this.createImagePath(`${$event.dbPath}`));
  }
  onCreate() {
    this.imagePath.set(this.fileInfo.dbPath);
  }
}
