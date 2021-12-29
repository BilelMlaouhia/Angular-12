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
     })
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
