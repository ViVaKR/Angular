import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FileManagerComponent } from '@app/file-manager/file-manager.component';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { AuthService } from '@app/services/auth.service';
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
export class AccountComponent {

  baseUrl = environment.baseUrl;

  authService = inject(AuthService);
  translate = inject(TranslateModule);
  accountDetail$ = this.authService.getDetail();

  account$ = this.authService.getDetail();
  response!: IFileInfo;
  imagePath!: string;

  uploadFinisted($event: any) {
    this.response = $event;
  }

  createImagePath(serverPath: string) {
    if (serverPath === null || serverPath === '' || serverPath === undefined)
      return '/login-icon.png';
    return `${this.baseUrl}/${serverPath}`;
  }

  onCreate() {
    if (this.response === undefined || this.response === null)
      this.imagePath = '/login-icon.png';
    this.imagePath = this.response.dbPath;

    this.account$.subscribe(
      (data) => {
        // data. = this.imagePath;
        // this.authService.update(data).subscribe();
      }
    );
  }
}
