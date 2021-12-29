import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UserInterface } from '../services/user.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
 public allUsers:any
 public currentUser?:UserInterface
 public authUser:any
 public deleteUser=true
 public val= "delete account "
 

  constructor(private user:UsersService, private router:Router,private navBar:NavBarComponent) {
    this.user.getAllUsers().then((data)=>{
      this.allUsers=data
     
    })
   
   }

  ngOnInit(): void {
    this.authUser=this.user.userFound
  }
  
  getDeleteUser(id:number){
    this.user.deleteUser(id)
  }

  postUserId(id:any){
    console.log("user id is "+id);
    
   return new Promise((resolve,reject)=>{
    this.user.currentUser=id
    resolve(id)
   }).then(()=>{
     
     this.router.navigateByUrl('/updateUser/'+id)
   })
  }

  getDelete(){
    this.val = "delete account ( 3 )"
    setInterval(()=>{this.val="delete account ( 2 )"},1000)
    setInterval(()=>{this.val="delete account ( 1 )"},2000)
    setInterval(()=>{this.val="delete account ( 0 )"},3000)

    setInterval(()=>{
      this.deleteUser=false
      
    },3200)
  
  }



}
