import { Component, computed, inject, signal } from '@angular/core';
import { AvatarUrlPipe } from "../../../core/pipes/avatar-url-pipe";
import { UserStore } from '@app/core/services';
import { IUser } from '@app/core/interfaces/i-user';

@Component({
  selector: 'app-home-transcription',
  imports: [AvatarUrlPipe],
  templateUrl: './home-transcription.html',
  styleUrl: './home-transcription.scss',
})
export class HomeTranscription {
  handleImageError($event: ErrorEvent) {
    throw new Error('Method not implemented.');
  }

  userStore = inject(UserStore);
  user: IUser | null = this.userStore.currentUser();

}
