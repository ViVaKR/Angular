import { isDevMode } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const devModeGuard: CanActivateFn = (route, state) => {
  return isDevMode();
};
