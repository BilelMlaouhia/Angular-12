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
private url_computer="http://localhost:8082/produit"
private url_user="http://localhost:8082/acteur"
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
    return this.http.get<pcGamer[]>(this.url_computer+"/all")
  }
  onGetProduitById(id:number):Observable<any>{
  return this.http.get<any>(this.url_computer+"/"+id)
  }

  onUpdateProduit(produit:any):Observable<any>{
  let prod ={
    idProduit:produit.id,
    name:produit.nom,
    prix:produit.prix,
    quantite:produit.quantity,
    description:produit.description,
    image:produit.image,
    acteurId:produit.acteur.id,

  }
    console.log("produit: "+JSON.stringify(prod))
  return this.http.put(this.url_computer+"/update",prod)
  }
  onGetUser():Observable<UserInterface[]> {
   return this.http.get<UserInterface[]>(this.url_user)
  }

  onPostCurrentPage(p:pcGamer[]){
    this._allPages.next(p)
  }

}
