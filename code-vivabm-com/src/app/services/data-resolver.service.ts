import { inject } from '@angular/core';
import { CodeService } from './code.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { EMPTY, mergeMap, of, take } from 'rxjs';

export const dataResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const codeService = inject(CodeService);
  return codeService.getCodes().pipe(
    take(1),
    mergeMap((data) => {
      if (data) {
        return of(data);
      } else {
        return EMPTY;
      }
    })
  );
}
