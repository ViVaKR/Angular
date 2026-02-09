import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {

  // private http = inject(HttpClient);
  // private route = inject(ActivatedRoute);

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getTitle = (): string => {
    let deepest: ActivatedRoute = this.route;
    while (deepest.firstChild) {
      deepest = deepest.firstChild;
    }
    return deepest.snapshot.title ?? deepest.snapshot.routeConfig?.title as string ?? '';
  }

  getPublicIpAddress(): Observable<{ ip: string, ipArray: string[] }> {
    return this.http.get<{ ip: string, ipArray: string[] }>('https://api.ipify.org?format=json').pipe(
      map(data => ({
        ip: data.ip,
        ipArray: data.ip.split('.')
      })), retry(2), // 실패 시 최대 2회 재시도
      catchError(() => of({ ip: '0.0.0.0', ipArray: ['0', '0', '0', '0'] })));
  }

  includesIgnoreCase(source: readonly string[], targets: readonly string[]): boolean {
    const set = new Set(targets.map(x => x.toLowerCase()));
    return source.some(x => set.has(x.toLowerCase()));
  }

  /**
   * 비밀번호 동일성 확인
   * @param group formGroup
   * @param password password
   * @param confirmPassword confirmPassword
   * @returns boolean
   */
  passwordMatchValidator(group: FormGroup, password: string, confirmPassword: string) {
    const source = group.get(password)?.value;
    const target = group.get(confirmPassword)?.value;
    return source === target ? null : { 'mismatch': true };
  }

  isNullOrUndefined(value: string): boolean {
    return value === null || value === undefined;
  }

}


/*
    // const result = this.userRoles.map(role => role.toLowerCase()).some(x => this.requiredRoles.includes(x));
    // const isEqual = str1.localeCompare(str2, undefined, { sensitivity: 'accent' }) === 0;

*/
