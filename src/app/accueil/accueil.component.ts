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
   selectedPrevious=false
   selectedNext=false

  constructor(private gestion:GestionService,private userService:UsersService) {
     this.currentUser =this.userService.userFound


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

  if(this.lastPage==1){
    this.lastPage=1
  }else{
    this.lastPage = this.lastPage-1
  }

    this.changePage(this.lastPage)
    console.log("lastpage value "+this.lastPage);
    this.selectedNext=false
    this.selectedPrevious=true
    setTimeout(() => {
      this.selectedPrevious=false
    }, 400);
  }

  changePageNext(){

    if( this.lastPage==this.numbrePages.length){
      this.lastPage =this.numbrePages.length
      this.changePage(this.lastPage)

    }else {
        this.changePage(this.lastPage+1)
    }

    this.selectedNext=true
    this.selectedPrevious=false
    setTimeout(() => {
      this.selectedNext=false
    }, 400);
  }

  changePage(pageNumber:number){

    for(let h=0;h<=this.numbrePages.length;h++){
      this.selected[h]=false
    }

   this.allPages=[]
   let j=0

    for(let i=6*(pageNumber-1);i<6*pageNumber;i++){

        this.allPages[j]=this.pcs[i]
     j++
    }

    this.selectedNext=false
    this.selectedPrevious=false

    this.selected[pageNumber]=true

    this.lastPage=pageNumber


    }

   pagination(){
    this.gestion.ongetComputers().subscribe(data=>{
      this.pcs=data
      let longeur= this.pcs.length/6

    for(let n=0;n<longeur;n++){
      this.numbrePages[n]=n+1
      this.selected[n]=false
    }
     this.selected[1]=true
     this.lastPage=1
    for(let i=0;i<6;i++){
      this.allPages[i]=this.pcs[i]
    }
    })
   }

}
