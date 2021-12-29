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
  

  

  constructor(private gestion:GestionService,private userService:UsersService) {
     this.currentUser =this.userService.userFound
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
  
}
