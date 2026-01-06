import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '@app/core/interfaces/i-user';
import { UserStore } from '@app/core/services/user-store';
import { environment } from '@env/environment.development';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FileService } from '@app/core/services/file-service';
import { IFileInfo } from '@app/core/interfaces/i-file-info';
import * as helper from '@app/shared/utilities/helpers'
import { MatTooltip } from "@angular/material/tooltip";
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTooltip,
    MatIconModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  private baseUrl = environment.apiUrl;
  userStore = inject(UserStore);
  fileService = inject(FileService);
  fileInfo: WritableSignal<IFileInfo | null> = signal<IFileInfo | null>(null);

  selectedFile = signal<File | null>(null);
  uploadedFile = signal<any>(null);
  currentUser = toSignal<IUser | null>(this.userStore.user$, { initialValue: null });

  onSingleFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedFile.set(file);
    const fileInfo: IFileInfo = { formatedSize: helper.formatBytes(file.size), size: file.size };
    this.fileInfo.update(() => fileInfo);
    this.fileService.upload(file, 2);
  }

  getSize() {
    return `아바타 변경 (클릭)`;
  }

  defaultAvatar = `${this.baseUrl}/Images/buddha.png`;

  // #region 아바타 실시간 갱신
  // (1). 먼저 기본 아바타를 signal로 만들어
  private defaultAvatarSignal = computed(() => {
    const user = this.currentUser();
    if (user === null || user.avatar === 'default.png') {
      return this.defaultAvatar;
    }
    return `${this.baseUrl}/Images/avatars/${user.id}/${user.avatar}`;
  });

  // (2). 업데이트된 아바타를 signal로 변환
  private updatedAvatar = toSignal(this.fileService.avatarUpdated$, { initialValue: null });

  // (3). 두 signal을 합쳐서 최종 아바타 결정
  avatar = computed(() => {
    const updated = this.updatedAvatar();
    if (updated) {
      return `${this.baseUrl}${updated}`;
    }
    return this.defaultAvatarSignal();
  });
  // #endregion

}
