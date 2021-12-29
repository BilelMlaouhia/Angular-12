import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  autoriser=false
  constructor( ) { 

  }
  canActivated(){
    return  this.autoriser
  }

}
