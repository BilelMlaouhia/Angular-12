import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../services/user.interface';
import { pcGamer } from '../pc.interface';
import { GestionService } from '../services/gestion.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class NavBarComponent implements OnInit {

public ok=localStorage.getItem('verifier')
public okUser :any
public currentUserId:any
public observer=this.userService
public allUsers:any
public observerStatus?:Object
public allPages:pcGamer[]=[]

  constructor(private authService:AuthService,private route:ActivatedRoute,private userService:UsersService,
    private router:Router,private http:HttpClient, private gestion:GestionService) {

 if(this.currentUserId) console.log("from navBar ts userId: "+this.currentUserId);
     this.okUser=this.userService.okUser
     this.onLogOut()
     this.Ok_or_Not()

  }

  ngOnInit(): void {
    this.currentUserId=this.userService.currentUser


  }





  onLogOut(){
    localStorage.removeItem('id')
      localStorage.removeItem('verifier')
    localStorage.removeItem('userId')
   if(!localStorage.getItem('userId')){
       this.okUser=false
   this.observerStatus=false
   console.log();

   }

  }



  getMyProfile(){

   this.router.navigateByUrl('/myprofile/'+localStorage.getItem('userId'))

  }




  Ok_or_Not(){
    this.userService.statusLogin.subscribe(res=>{
      this.observerStatus=res
      console.log("line 89 navbar service "+this.observerStatus);

    })
  }

  serchProd(){

  }

}
