import { Component, OnInit } from '@angular/core';
import { pcGamer } from '../pc.interface';
import { GestionService } from '../services/gestion.service';

@Component({
  selector: 'app-chosen-products',
  templateUrl: './chosen-products.component.html',
  styleUrls: ['./chosen-products.component.scss']
})
export class ChosenProductsComponent implements OnInit {
  totalPrice:number=0
  chosenProducts:pcGamer[]=[]
  showdescription:boolean[]=[]
  fake:pcGamer[]=[]
  constructor(private gestion:GestionService) {

  this.chosenProducts=this.gestion.chosen


  }

  ngOnInit(): void {

   for(let i=0;i<this.chosenProducts.length;i++){
     this.showdescription[i]=false
     this.totalPrice=this.chosenProducts[i].prix+this.totalPrice
   }
  }

  onShowDescpiton(i:number){
this.showdescription[i] =!this.showdescription[i]
  }


  onDeleteProd(i:number){
    this.totalPrice=this.totalPrice - this.chosenProducts[i].prix
   let j=0
  let n:pcGamer[]=this.chosenProducts
  this.chosenProducts=[]


   for(let k=0;k<n.length;k++){
     if(k!=i){
       this.chosenProducts[j]=n[k]
       j++
     }
   }


   this.gestion.lengthChosen$.next(this.chosenProducts.length)
   this.gestion.chosen=this.chosenProducts
  }

  onClearChoices(){
    this.totalPrice=0
    this.chosenProducts=[]
    this.gestion.lengthChosen$.next(0)
    this.gestion.chosenProducts$.next(this.fake)
    this.gestion.chosen=[]

  }
}
