import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../interfaces/i-user';
import { environment } from '@env/environment.development';

@Pipe({ name: 'avatarUrl' })
export class AvatarUrlPipe implements PipeTransform {

  transform(user: IUser | null): string {

    if (!user || !user.avatar) {
      return 'assets/images/boy-2.webp';
    }

    return `${environment.apiUrl}/Images/avatars/${user.id}/${user.avatar}`;
  }

}

/*
--> 사용법
<img [src]="user | avatarUrl">

*/
