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

  constructor(private gestion:GestionService,private userService:UsersService) {
    this.get_user_Id()
 this.ID= localStorage.getItem('id')
   }

  ngOnInit(): void {
     this.gestion.ongetComputers().subscribe(data=>{
        this.pcs=data})
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

}
