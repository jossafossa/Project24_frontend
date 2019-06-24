import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(state.url);
    if(state.url == '/accounts/create'){
      return true;
    }
    return this.verifyLogin();
  }

  verifyLogin(): boolean{
    if (localStorage.getItem('isLoggedIn') != 'true') {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
