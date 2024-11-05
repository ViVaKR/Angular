import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FileManagerComponent } from '@app/file-manager/file-manager.component';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { AuthService } from '@app/services/auth.service';
import { CodeService } from '@app/services/code.service';
import { FileManagerService } from '@app/services/file-manager.service';
import { environment } from '@env/environment.development';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgFor,
    JsonPipe,
    MatDividerModule,
    FileManagerComponent,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit, AfterViewInit, OnDestroy {



  profilePhoto = '프로필 사진 (Drag & Drop)';
  choice = 0;
  baseUrl = environment.baseUrl;
  fileInfo: IFileInfo = { dbPath: '', fullPath: '', fileSize: 0 };
  imagePath: WritableSignal<string> = signal('/login-icon.png');
  authService = inject(AuthService);
  codeService = inject(CodeService);
  account$ = this.authService.getDetail();
  fileService = inject(FileManagerService);

  ngOnInit(): void {
  }

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
    });
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

  ngOnDestroy(): void {
  }
}
