import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '../services/user.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
   img:string=''
   checkPassword:any
   newId:any
   allUsers:any
  public email_used=false
   cmp:any

  constructor(private userService:UsersService, private http:HttpClient, private router:Router) {
  
   }

  ngOnInit(): void {
  }
  
  onGetImage(e:any){
  
this.img=e.target.files[0].name

  }

  onPostData(f:any){
    let compteur=0
    let long
  let   newUser={
      id:0,
      className:'',
      email:'',
      fullName:'',
      image:'',
      level:0,
      password:'',
      section:''
    }
this.userService.getAllUsers().then((data)=>{
    this.allUsers=data
}).then(()=>{
  long=this.allUsers.length
  for(let i=0;i<long;i++){
     if(this.allUsers[i].email!=f.email){
       compteur++
     }
  }
// console.log("line 53 users "+JSON.stringify(this.allUsers)+" long : "+long+" compteur: "+compteur);

  
  if (compteur==long){
   
    this.http.post("http://localhost:3000/users",{
  id:(this.allUsers[long-1].id)+1,
  fullName : f.fullName,
  className:f.className,
  email : f.email,
  level : f.level,
  section : f.section,
  password : f.password,
  image : this.img

}).toPromise() 
 .then((u)=>{
   console.log("user added correctly "+u)
   this.userService.userFound=true
   this.router.navigateByUrl('/myprofile')
})
    }else{
      console.log('wrong email used')
      this.email_used=true
    }
  
}).catch(err=>console.log("from post user data :"+err))

 }

 onCheckPassword(f:any){
  if(f.password===f.confirmPassword){
    this.checkPassword=true
  }else {
    this.checkPassword=false
  }
  console.log("the original password  is "+f.password);
  console.log("the password confirmed is "+f.confirmPassword);
  
 }

 onCheckEmail(f:any){
 
   let data
   let long
  
  let mail = f
  this.http.get<UserInterface[]>("http://localhost:3000/users").toPromise()
  .then((users)=>{
   data=users
   return data
  }).then((d)=>{
    console.log("data array "+d.length);
    
    long=d.length
    for (let i=0;i<long;i++){
      console.log("email from array :"+d[i].email+" mail formulaire :"+mail);

     
      if(d[i].email==mail){
        
      this.email_used=true
      }else this.email_used=false
    }
  console.log("valeur de email used "+this.email_used);
  
  }).catch(err=>console.log(err)
  )
 
 

 }



}
