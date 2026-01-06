import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserStore } from '../services/user-store';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const router = inject(Router);
  const userStore = inject(UserStore);
  const expectedRoles = route.data['roles'];

  if (!hasMatchingRole(userStore.userRoles(), expectedRoles)) {
    const url = state.url;
    router.createUrlTree([''], { queryParams: { url } })
  } else {
    console.log('Required Roles:', expectedRoles);
  }


  return true;
};

export function hasMatchingRole(
  userRoles: string[] | string | undefined,
  expectedRoles: string[]
): boolean {
  if (!userRoles) return false;
  if (expectedRoles.length === 0) return true;
  const rolesArray = Array.isArray(userRoles) ? userRoles : [userRoles];
  if (rolesArray.length === 0) return false;
  return expectedRoles.some(role => rolesArray.includes(role));
}
