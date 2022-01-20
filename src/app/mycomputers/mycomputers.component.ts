import { Component, OnInit } from '@angular/core';
import { pcGamer } from '../pc.interface';
import { GestionService } from '../services/gestion.service';
import { UserInterface } from '../services/user.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-mycomputers',
  templateUrl: './mycomputers.component.html',
  styleUrls: ['./mycomputers.component.scss']
})
export class MycomputersComponent implements OnInit {
  public showDetails:boolean[]=[]
  public myPcs:pcGamer[]=[]
  public pcs:pcGamer[]= []
  public user:UserInterface[]=[]
  public currentUser?:Object
  public ID:any

  showdescription:boolean[]=[]
  allPages:pcGamer[]=[]
  searchPages:pcGamer[]=[]
  numbrePages:number[]=[]
  lastPage:number=0
  selected:boolean[]=[]
  selectedPrevious=false
  selectedNext=false
  endof=false
  firstof=true

  constructor(private gestion:GestionService,private userService:UsersService) {
    this.get_user_Id()
 this.ID= localStorage.getItem('id')
   }

  ngOnInit(): void {

  this.pagination()

  }

  onShowDetails(i:number){
   this.showDetails[i] = !this.showDetails[i]
  }

  onSendId(id:any){
  this.gestion.computerIdNow=id;
  }

  get_user_Id(){
    this.userService.statusLogin.subscribe((id)=>{

      this.currentUser=id
    })
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

          this.gestion.onGetUser().subscribe((user)=>{
            this.user=user
            let j=0
            for (let i=0;i<this.pcs.length;i++){
              if(this.ID==this.pcs[i].userId){
                this.myPcs[j]=this.pcs[i]
                this.showDetails[j]=false
                j++
              }
            }
          })
          this.numbrePages=[]
          let longeur=this.myPcs.length/6
          if(longeur<=0){longeur=1}
console.log("longeur est :"+longeur);

             if(this.myPcs.length<=1){
               this.numbrePages[0]=1
               this.selected[0]=true
             }else if(this.myPcs.length>1){

            for(let n=0;n<longeur;n++){
              this.numbrePages[n]=n+1
              this.selected[n]=false
            }

     }else{
      this.myPcs=[]
      }
      this.selected[1]=true
      this.lastPage=1

    })
  }

}
