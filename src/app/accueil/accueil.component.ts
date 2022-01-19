import { Component, OnInit } from '@angular/core';
import { GestionService } from '../services/gestion.service';
import { pcGamer } from '../pc.interface';
import { UserInterface } from '../services/user.interface';
import { UsersService } from '../services/users.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  show:String=""
  showdescription:boolean[]=[]
  public pcs:pcGamer[]= []
  public user:UserInterface[]=[]
  public currentUser:any
   allPages:pcGamer[]=[]
   searchPages:pcGamer[]=[]
   numbrePages:number[]=[]
   lastPage:number=0
   selected:boolean[]=[]
   selectedPrevious=false
   selectedNext=false
   endof=false
   firstof=true
   slt="salut"
   clicked=false

  constructor(private gestion:GestionService,private userService:UsersService) {
     this.currentUser =this.userService.userFound


   }

  ngOnInit(): void {
    this.pagination()

     this.gestion.onGetUser().subscribe((user)=>{
       this.user=user
     })
    this.userService.showing$.subscribe(res=>this.searchProducts(res))


  }

  c(){
    this.clicked= !this.clicked
  }

  onShowDescpiton(i:number){
    this.showdescription[i]=! this.showdescription[i]
  }

  onSendId(id:any){
  this.gestion.computerIdNow=id;
  }

  changePagePrevious(){
  if(this.lastPage==2){
    this.firstof=true
  }else{
   this.firstof=false
  }
  this.endof=false
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
    if(this.lastPage==this.numbrePages.length-1){
      this.endof=true
    }else {
      this.endof=false
    }
    this.firstof=false

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
    // changing value of next and previous anchors

if(pageNumber==1){
  this.firstof=true
  this.endof=false
}else if(pageNumber==this.numbrePages.length){
  this.firstof=false
  this.endof=true
}else{
  this.firstof=false
  this.endof=false
}


//code
    for(let h=0;h<=this.numbrePages.length;h++){
      this.selected[h]=false
    }

   this.allPages=[]
   let j=0

    for(let i=6*(pageNumber-1);i<6*pageNumber;i++){

        this.allPages[j]=this.pcs[i]
     j++
    }
   this.gestion.onPostCurrentPage(this.allPages)
    this.selectedNext=false
    this.selectedPrevious=false

    this.selected[pageNumber]=true

    this.lastPage=pageNumber


    }

   pagination(){
    this.gestion.ongetComputers().subscribe(data=>{
      this.pcs=data
      let longeur= this.pcs.length/6
       if(this.pcs.length>=1){
        for(let n=0;n<longeur;n++){
          this.numbrePages[n]=n+1
          this.selected[n]=false

        }
         this.selected[1]=true
         this.lastPage=1
        //  this.firstof=true
        for(let i=0;i<6;i++){
          this.allPages[i]=this.pcs[i]
          this.showdescription[i]=false
        }
       }else{
       this.allPages=[]
       }

    })
   }

   searchProducts(v:String){
     let recherche = v.toLocaleLowerCase()
     console.log(recherche);

     if(recherche==" "|| recherche==""){
       this.allPages=[]
       this.pcs=[]
      this.pagination()
    }else {
      this.gestion.ongetComputers().subscribe(res=>{

        this.pcs=res
        this.allPages=[]
        this.searchPages=[]
        let j=0
         this.pcs.filter(p=>{
         if(p.nom.toLocaleLowerCase().indexOf(recherche)!=-1){
         this.searchPages.push(p)
        }
        this.pcs=this.searchPages
        this.numbrePages=[]

//rachma
        for(let n=0;n<this.pcs.length/6;n++){
          this.numbrePages[n]=n+1
          this.selected[n]=false
        }
         this.selected[1]=true
         this.lastPage=1

        for(let i=0;i<6;i++){
          this.allPages[i]=this.pcs[i]
        }
        this.changePage(1)

       })
        })
    }

   }

   addToCard(pc:pcGamer) {
  this.gestion.onAddProductsToCard(pc)
  this.gestion.lengthChosen$.next(this.gestion.chosen.length)
   }



}
