import { Component, OnInit } from '@angular/core';
import { GestionService } from '../services/gestion.service';
import { pcGamer } from '../pc.interface';
import { UserInterface } from '../services/user.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  public pcs:pcGamer[]= []
  public user:UserInterface[]=[]
  public currentUser:any
   allPages:pcGamer[]=[]
   numbrePages:number[]=[]
   lastPage:number=0
   selected:boolean[]=[]

  constructor(private gestion:GestionService,private userService:UsersService) {
     this.currentUser =this.userService.userFound
     this.changePage(1)


   }

  ngOnInit(): void {
    this.pagination()


     this.gestion.onGetUser().subscribe((user)=>{
       this.user=user
     })
  }
  onSendId(id:any){
  this.gestion.computerIdNow=id;
  }

  changePagePrevious(){
    if(this.lastPage<=0){
      this.changePage(1)
      this.selected[1]=true
    }else {
      this.changePage(this.lastPage)
      this.selected[this.lastPage]=true
    }

  }
  changePageNext(){
    if(this.lastPage+3>=this.numbrePages.length){
      this.changePage(this.numbrePages.length)
      this.selected[this.numbrePages.length]=true
    }else{
      this.changePage(this.lastPage+3)
      this.selected[this.lastPage+3]=true
    }

  }
  changePage(pageNumber:number){

   this.allPages=[]
  let j=0
    for(let i=6*(pageNumber-1);i<6*pageNumber;i++){

        this.allPages[j]=this.pcs[i]
     j++
    }
    this.selected[pageNumber]=true
    this.selected[this.lastPage]=false
     this.lastPage=pageNumber-2
    }

   pagination(){
    this.gestion.ongetComputers().subscribe(data=>{
      this.pcs=data
      let p=this.pcs.length
      let longeur=0
   if(p%6==0){
    longeur = (p/6)
   }else{
       longeur = (p/6)+1
   }
   console.log("le longeur "+longeur);

    for(let n=0;n<longeur;n++){
      this.numbrePages[n]=n
      this.selected[n]=false
    }
    })
   }

}
