import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root'
})

export class UnAuthGuard implements CanActivate {
  isNotAuth=true
  constructor(private authService:AuthService){
  this.isNotAuth = !this.authService.autoriser
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isNotAuth;
  }
   
}
