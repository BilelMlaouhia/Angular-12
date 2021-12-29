import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  public autoriser=false;
  
  constructor(private authService:AuthService, private router:Router){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
  this.autoriser= this.authService.autoriser
    if(this.autoriser==true){
      console.log("authGuard :"+this.autoriser);
      
      return true
    }else 
    this.router.navigateByUrl('/accueil')
{    console.log("authGuard :"+this.autoriser);
      return false;}
      
  }
  
}
