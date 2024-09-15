import { isDevMode } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const devEnvGuardGuard: CanActivateFn = (route, state) => {
  return isDevMode();
};
