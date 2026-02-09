import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '@app/core/interfaces/i-user';
import { UserStore } from '@app/core/services/user-store';
import { environment } from '@env/environment.development';
import { FileService } from '@app/core/services/file-service';
import { IFileInfo } from '@app/core/interfaces/i-file-info';
import { CommonModule } from '@angular/common';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { ILoadingState } from '@app/core/interfaces/i-loading-state';
import { ITodaySutra } from '@app/core/interfaces/i-today-sutra';
import { TodaySutraService } from '@app/core/services/today-sutra-service';
import { RsCode } from '@app/core/enums/rs-code';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  private baseUrl = environment.apiUrl;
  private todaySutraService = inject(TodaySutraService);
  defaultAvatar = `${this.baseUrl}/Images/avatars/default.png`;

  userStore = inject(UserStore);
  fileService = inject(FileService);
  fileInfo: WritableSignal<IFileInfo | null> = signal<IFileInfo | null>(null);
  selectedFile = signal<File | null>(null);
  uploadedFile = signal<any>(null);
  currentUser = toSignal<IUser | null>(this.userStore.user$, { initialValue: null });

  private data$ = toObservable(this.currentUser).pipe(
    switchMap(user => {
      if (!user) {
        return of<ILoadingState<ITodaySutra>>({
          data: null,
          loading: false,
          error: null
        });
      }

      return this.todaySutraService.readMyTodaySutra().pipe(
        map(res => {
          if (res?.rsCode === RsCode.Ok)
            return { data: res.rsData, loading: false, error: null };
          return { data: null, loading: false, error: new Error('데이터를 불러올 수 없습니다.') };
        }),
        startWith<ILoadingState<ITodaySutra>>({ data: null, loading: true, error: null }),
        catchError(err => of<ILoadingState<ITodaySutra>>({ data: null, loading: false, error: err }))
      );
    })
  );

  private state = toSignal(this.data$, {
    initialValue: { data: null, loading: false, error: null }
  });

  data = computed(() => this.state().data);
  isLoading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  onSingleFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.selectedFile.set(file);
    this.fileService.upload(file, 2);
  }

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

}
