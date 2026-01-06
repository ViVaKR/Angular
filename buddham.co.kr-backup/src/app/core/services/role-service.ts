import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IRole } from '@app/core/interfaces/i-role';
import { environment } from '@env/environment.development';
import { BehaviorSubject, catchError, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { IResponse } from '../interfaces/i-response';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  // ✅ 1. 새로고침 트리거 (Signal 방식)
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  // ✅ 2. 자동 갱신되는 roles Observable
  private roles$ = this.refreshTrigger$.pipe(
    switchMap(() =>
      this.http.get<IRole[]>(`${this.baseUrl}/role/list `).pipe(
        tap(roles => console.log('Roles loaded:', roles.length)),
        catchError((err) => {
          console.error('X Failed to load roles', err);
          return of([] as IRole[]); // 에러시 빈 배열
        })
      )
    )
  );

  // ✅ 3. Signal로 변환 (템플릿에서 바로 사용 가능)
  roles = toSignal(this.roles$, { initialValue: [] as IRole[] });

  // ✅ 4. 로딩 상태 관리
  isLoading = signal(false);

  // ✅ 5. 에러 상태 관리
  error = signal<string | null>(null);

  // ✅ 6. 수동 새로고침 메서드
  refresh(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.refreshTrigger$.next();
  }

  // ✅ 7. 역할 추가 후 자동 갱신
  addRole(role: IRole): Observable<IResponse> {
    try {
      return this.http.post<IResponse>(`${this.baseUrl}/role`, role)
    } catch (err) {
      this.error.set('역할 추가 실패');
      throw err;
    }
    finally {
      this.refresh();
    }
  }

  // ✅ 8. 역할 삭제 후 자동 갱신
  deleteRole(id: string): Observable<boolean> {
    try {
      return this.http.delete<boolean>(`${this.baseUrl}/role/${id}`);
    } catch (err) {
      this.error.set('역할 삭제 실패');
      throw err;
    }
    finally {
      this.refresh();
    }
  }




  // private roles$ = this.http.get<IRole[]>(this.rolesUrl).pipe(
  //   shareReplay({ bufferSize: 1, refCount: true }),
  //   catchError((err) => {
  //     console.error("Failed to load roles:", err);
  //     throw err; // 앱 정책에 따라 빈 배열 반환도 가능: of([])
  //   })
  // );

  // getRoles(): Observable<IRole[]> {
  //   return this.roles$;
  // }
}
