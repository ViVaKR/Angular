import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate
{

  constructor(private router: Router, private userService:UserService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    const token = localStorage.getItem(this.userService.userToken);

    if (token && token.length > 0)
    {
      return true;
    }
    else
    {
      this.router.navigate(['/login'])
      return false;
    }
  }
}
