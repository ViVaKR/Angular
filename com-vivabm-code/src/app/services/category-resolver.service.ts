import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CategoryService } from './category.service';
import { EMPTY, mergeMap, of, take } from 'rxjs';

export const categoryResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const categoryService = inject(CategoryService);
  return categoryService.getCategories().pipe(
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

