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

    this.http.post("http://localhost:3000/users",f).toPromise()
 .then((u)=>{
   console.log("user added correctly "+f)
   this.userService.userFound=true
   this.router.navigateByUrl('/myprofile')
})

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
 this.http.get<UserInterface[]>("http://localhost:3000/users").subscribe((users)=>{
   data=users
   console.log("data array "+data.length);

   long=data.length
   for (let i=0;i<long;i++){
     console.log("email from array :"+data[i].email+" mail formulaire :"+mail);
   if(data[i].email==mail){
    this.email_used=true;
    break
     }else this.email_used=false
   }
 console.log("valeur de email used "+this.email_used);

 })
}


}
