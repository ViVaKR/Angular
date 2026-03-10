// user-service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from '@env/environment.development';
import { UserStore } from './user-store';
import { IUser } from '@app/core/interfaces/i-user';
import { IResponse } from '@app/core/interfaces/i-response';
import { TokenStorage } from './token-storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUri = environment.apiUrl;
  http = inject(HttpClient);
  userStore = inject(UserStore);
  private tokenStorage = inject(TokenStorage);

  private currentUserRequest$: Observable<IUser | null> | null = null;

  constructor() { }

  /**
   * 현재 로그인한 사용자 정보 조회
   * @returns Observable<IUser | null>
   */
  getMyInfo(): Observable<IUser | null> {

    // 토큰이 없으면 즉시 null 반환
    if (!this.tokenStorage.getAccessToken()) {
      return of(null);
    }

    // 이미 진행 중인 요청이 있으면 재사용
    if (this.currentUserRequest$) {
      return this.currentUserRequest$;
    }

    this.currentUserRequest$ = this.http.get<IUser>(`${this.apiUri}/account/detail`).pipe(
      tap(user => {
        this.userStore.setUser(user);
      }),
      catchError(error => {
        console.error('❌ getMyInfo 오류:', error.status, error.message);

        // 인증 오류면 토큰 제거
        if (error.status === 401 || error.status === 403) {
          this.tokenStorage.clear();
          this.userStore.clearUser();
        }

        return of(null);
      }),
      finalize(() => {
        this.currentUserRequest$ = null;
      }),
      shareReplay(1)
    );

    return this.currentUserRequest$;
  }

  /**
   * 사용자 정보 업데이트
   */
  updateMyInfo(user: IUser): Observable<any> {
    return this.http.put(`${this.apiUri}/account/${user.id}`, user).pipe(
      tap(() => this.userStore.updateUser(user))
    );
  }

  /**
   * 관리자용: 사용자 목록 조회
   */
  getUserList(): Observable<IResponse<IUser[]>> {
    return this.http.get<IResponse<IUser[]>>(`${this.apiUri}/Account`);
  }

  /**
   * 관리자용: 특정 사용자 상세 조회
   */
  getUserById(userId: string): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(`${this.apiUri}/Account/${userId}`);
  }


  getUserAvatarById(userId: string | number, avatar?: string) {
    if (avatar === 'default.png') {
      return `${this.apiUri}/Images/avatars/buddha.png`;
    }
    const avatarUrl = `${this.apiUri}/Images/avatars/${userId}/${avatar}`;
    return avatarUrl;
  }
}
