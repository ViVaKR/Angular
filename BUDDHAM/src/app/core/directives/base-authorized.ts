import { DestroyRef, Directive, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStore } from '../services/user-store';

@Directive({
  selector: '[appBaseAuthorized]',
})
export abstract class BaseAuthorized {
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly userStore = inject(UserStore);
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly isAuthorized = signal(false);

  constructor() {
    const effectRef = effect(() => {
      const initialized = this.userStore.isInitialized();
      if (!initialized) return;
      this.checkAuthorization();
      effectRef.destroy();
    });

    this.destroyRef.onDestroy(() => effectRef.destroy());
  }

  private checkAuthorization(): void {
    const userRoles = this.userStore.userRoles();
    const expectedRoles = this.route.snapshot.data['roles'] as string[] || [];
    const hasPermission =
      expectedRoles.length === 0 ||
      expectedRoles.some(role => userRoles.includes(role));

    if (!hasPermission) {
      this.router.navigate(['']);
    } else {
      this.isAuthorized.set(true);
    }
  }
}

