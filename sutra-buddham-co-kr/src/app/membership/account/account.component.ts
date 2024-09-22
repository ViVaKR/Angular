import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ImageUploaderComponent } from '@app/image-uploader/image-uploader.component';
import { AuthService } from '@app/services/auth.service';
import { LayoutService } from '@app/services/layout.service';
import { PlaygroundService } from '@app/services/playground.service';
import { UploadComponent } from '@app/upload/upload.component';
import { environment } from '@env/environment.development';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgFor,
    JsonPipe,
    MatDividerModule,
    UploadComponent,
    MatButtonModule,
    ImageUploaderComponent,
    TranslateModule,

  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  ipaddress: any;

  playgroundService = inject(PlaygroundService);

  translate = inject(TranslateService);

  getIp() {
    this.playgroundService.getPublicIpAddress().subscribe((res) => {
      this.ipaddress = res.ip;
    });
  }

  baseUrl = environment.baseURL;

  authService = inject(AuthService);

  layoutService = inject(LayoutService);

  accountDetail$ = this.authService.getDetail();

  response!: { dbPath: '' };

  imagePath!: string;

  constructor() {
    this.layoutService.nextFooter(true);
  }

  uploadFinisted($event: any) {
    this.response = $event;
  }

  createImgPath(serverPath: string) {
    if (serverPath === null || serverPath === '' || serverPath === undefined)
      return '/login-icon.png';
    return `${this.baseUrl}/${serverPath}`;
  }

  onCreate() {
    this.imagePath = this.response.dbPath
  }
}
