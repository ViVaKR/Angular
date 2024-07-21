import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.getToken()) {
    const token = authService.getToken();
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    })
    return next(cloned);
  }

  return next(req);
}
