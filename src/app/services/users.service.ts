import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { UserInterface } from './user.interface';

@Injectable({
  providedIn: 'root'
})

export class UsersService implements OnInit {
showing$ = new Subject<String>()

public allUsers:any
public currentUser=new Subject<any>()
public user_Connected_Now =this.currentUser.asObservable()
public lastId?:number
public userFound:any
public userOK:any
public user_id:any
public observe :any
 newUserId:any
 public former:any
 public allRight=true
 public utilisateur = new Subject<any>()
 public statusLogin =this.utilisateur.asObservable()

  constructor(private http:HttpClient, private router:Router,private authService:AuthService) {
   this.getUserById().then((id)=>{

   })




   }



   ngOnInit(): void {

   }

   Send_Connected_User_Id(id:any){
    this.currentUser.next(id)
   }

   sendLoginStatus(t:any){
   this.utilisateur.next(t)
   }


   getAllUsers() {
    return new Promise((resovle,reject)=>{
      this.http.get("http://localhost:3000/users").subscribe((data)=>{
        this.allUsers=data
        let lastOne= this.allUsers[-1+(this.allUsers.length)]
      this.lastId=lastOne.id
      this.authService.autoriser=true
        resovle(data)
        return data
       })
    }).catch(err=>console.log(err))

   }

   okUser():boolean{
    return this.userOK
   }

   deleteUser(id:number){
    this.http.delete("http://localhost:3000/users/"+id).toPromise()
    .then(()=>{

      console.log("user deleted successfully !!")
       this.router.navigateByUrl('/acceuil')
    }
    )

   }

 getUserById(){
  return new Promise((resolve,reject)=>{
    let us:any
    this.getAllUsers().then((users)=>{
     us=users
     for(let i=0;i<us.length;i++){
       if(us[i].id==this.currentUser){
         let h=us[i]
        // console.log("from user service line 60 :"+JSON.stringify(h));

         resolve (us[i])
       }
     }

    })
  })
 }

 id(){
   this.router.navigateByUrl('myprofile/'+this.newUserId)
 }

  navBarLogin(f:any){
  this.former=f
  }

  formLogin(){
   return this.former
  }

   onShowing(val:String){
     this.showing$.next(val)
   }

}
