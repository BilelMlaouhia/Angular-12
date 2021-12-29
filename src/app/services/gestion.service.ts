import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pcGamer } from '../pc.interface';
import { UserInterface } from './user.interface';


@Injectable({
  providedIn: 'root' 
})

export class GestionService {
private url_computer="http://localhost:3000/computers"
private url_user="http://localhost:3000/users"
public paramsRoute?:any
public computerIdNow:any
  constructor(private router:Router, private activeRoute:ActivatedRoute, private http:HttpClient) { 
   
    
  }
   
  ongetComputers():Observable<pcGamer[]>{
    return this.http.get<pcGamer[]>(this.url_computer)
  }
  
  onGetUser():Observable<UserInterface[]> {
   return this.http.get<UserInterface[]>(this.url_user) 
  }

  onGetActivetedRoute(){
    return this.paramsRoute;
  }
  
  showId(){
    console.log("the current id = " +this.computerIdNow);
    
  }
  
}
