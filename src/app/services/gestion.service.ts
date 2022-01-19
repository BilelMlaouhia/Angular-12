import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
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
chosenProducts$ = new Subject <pcGamer[]>()
_allPages = new Subject<pcGamer[]>()
allPages$ = this._allPages.asObservable()
fromNavBar$ =new Subject <pcGamer[]>()
chosen:pcGamer[]=[]
lengthChosen$ =  new Subject<number>()


  constructor(private router:Router, private activeRoute:ActivatedRoute, private http:HttpClient) {


  }




  onAdd_Prod_to_Chosen_Page(p:pcGamer[]){
    this.fromNavBar$.next(p)
  }

  onAddProductsToCard(p:pcGamer){
  this.chosen[this.chosen.length]=p
  this.chosenProducts$.next(this.chosen)
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

  onPostCurrentPage(p:pcGamer[]){
    this._allPages.next(p)
  }

}
