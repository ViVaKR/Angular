import { CanActivateFn } from '@angular/router';

export const devEnvGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
