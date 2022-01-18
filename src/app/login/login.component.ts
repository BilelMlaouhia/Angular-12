import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {

@Input() item=''
@Output()public hello= new EventEmitter()


 public allUsers:any
 public foundUser:any
 public loginDetails:any
 public gotUser:any
 public lastId:any
 public Id_User:any
//  public utilisateur:any
 public userConnected?:any
 public Mohamed:any
 public email_err:any
 public password_err:any
 public posted=false
 public email_pattern ='^[a-zA-Z0-9]\+@[a-zA-Z]+\.[a-zA-Z]{2,7} $'

  constructor(private user:UsersService, private router:Router,private http:HttpClient
    ,private authService:AuthService, private navBar:NavBarComponent) {
    this.user.getAllUsers().then((users)=>{
       this.allUsers=users
       this.lastId = this.user.lastId
  this.childEmit()
    })



  }

  childEmit(){
    this.hello.emit("hello from your child")
  }

  ngOnInit(): void {
   this.user.getUserById().then((id)=>{
   this.Id_User=id
   })

  console.log("from login component "+this.item);


  }

  findUser(detail:any){
this.user.getAllUsers().then((data)=>{
  this.allUsers=data
  })
  for(let i=0;i<this.allUsers.length;i++){

      if(this.allUsers[i].email == detail.email){
        this.email_err = "correct email adress"
        console.log("correct email");
        if(this.allUsers[i].password == detail.password){
          this.password_err = "correct password"
          console.log("correct password")
          this.loginDetails = this.allUsers[i]
          this.gotUser=true
          this.Id_User=this.loginDetails.id
          this.user.user_id=this.Id_User
          this.navBar.currentUserId=this.loginDetails.id
          return this.loginDetails
        }else {
           this.password_err = "wrong password!"
          console.log("wrong password")}

      }else {
        this.email_err = "wrong email adress!"
        console.log("wrong email");}

      }
    }

  postDetails(form:any){

  this.posted=true
 console.log("loged in with success");
     this.checkIfVerifUser(form).then((id)=>{
      // this.navBar.onLogIn()
     this.navBar.okUser = true
     this.user.Send_Connected_User_Id(id)
      localStorage.setItem('verifier','true')
           return id
     }).then((uid)=>{
         this.logInWithNavBar()
        localStorage.setItem('id',`${uid}`)

       if(localStorage.getItem('verifier')=='true'){

        localStorage.setItem('userId',`${uid}`)
       }


      this.user.newUserId=uid
      this.router.navigateByUrl('/myprofile/'+uid)


     }).catch(err=>console.log(err)
     )

  }

   checkIfVerifUser(form:any){
     return new Promise((resolve,reject)=>{
      this.foundUser=this.findUser(form)
      this.user.userFound=this.foundUser
      console.log("from line 57 "+this.gotUser);

     if( this.gotUser){
      this.authService.autoriser=true
      console.log("line 61 canActivet status :"+this.authService.canActivated());

       this.user.userOK=true
       resolve(this.foundUser.id)
     }else reject("can not find user!!")
     })
   }

   logInWithNavBar(){
   this.user.sendLoginStatus(true)
   }

   ID_connecting(id:any){
     this.userConnected = id
   }

   valueOfInput(f:any){
    //  this.Mohamed=f.age
     console.log("value of age :"+f.age);


   }

   onRestore(){
     this.email_err=null
     this.password_err=null
   }


}
