import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { UserStore } from './user-store';
import { IUser } from '@app/core/interfaces/i-user';
import { finalize, Observable, shareReplay, tap } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUri = environment.apiUrl;

  // * 진행 중인 요청 캐싱
  private currentUserRequest$: Observable<IUser> | null = null;

  constructor(
    private http: HttpClient,
    private userStore: UserStore) { }

  getMyInfo(): Observable<IUser> {

    // * 이미 요청 중이면 같은 Observable 반환 (중복 방지!)
    if (this.currentUserRequest$) {
      console.log('getMyInfo: 이미 요청 중, 캐시된 Observable 반화');
      return this.currentUserRequest$;
    }

    console.log('getMyInfo: 새 요청 시작');

    this.currentUserRequest$ = this.http.get<IUser>(`${this.apiUri}/account/detail`).pipe(
      tap(user => {
        console.log('getMyInfo: 응답 받은', user);
        this.userStore.setUser(user);
      }),
      finalize(() => {
        // * 완료되면 캐시 초기화
        console.log('getMyInfo: 요청 완료');
        this.currentUserRequest$ = null;
      }),
      shareReplay(1) // * 여러 구독자가 같은 결과 공유
    );
    return this.currentUserRequest$;

    // return this.http.get<IUser>(`${this.apiUri}/account/detail`)
    //   .pipe(tap(user => this.userStore.setUser(user)));
  }

  updateMyInfo(user: IUser) {
    return this.http.put(`${this.apiUri}/account/${user.id}`, user)
      .pipe(tap(() => this.userStore.updateUser(user)));
  }
}
