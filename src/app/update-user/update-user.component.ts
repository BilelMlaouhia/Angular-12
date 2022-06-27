import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { UserInterface } from '../services/user.interface';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {


  img:string=''
  currentUser:any
  newId:any
  allUsers:any
  userUpdated=false
  err:any

 constructor(private userService:UsersService, private http:HttpClient, private router:Router,
  private fb:FormBuilder) {

    this.userService.getUserById().then((data)=>{
      console.log("data of current user "+data);

      this.getDataUser(data).then((d)=> console.log("current updateuser is : "+JSON.stringify(d))
      )

    })
  }

  userForm:FormGroup= this.fb.group({

    id:[1,Validators.required],
    fullName:['',[Validators.required,Validators.minLength(4)]],
    section:['',Validators.required],
    password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
    image:[''],
    level:[3,Validators.required],
    email:['',[Validators.required,Validators.minLength(8),Validators.pattern("^([A-Za-z0-9._%+-]{3,40})+@[A-Za-z0-9.-]+\.[A-Za-z0-9._%+-]{2,9}$")]],
    className:['Client',Validators.required],
    checkPassword:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]]

   })



 ngOnInit(): void {

 }

 onGetImage(e:any){
 this.img=e.target.files[0].name


 }

 getDataUser(data:any){

  return new Promise((resolve,reject)=>{
    this.userForm.setValue({
      id:[data.id],
      fullName:[data.nom],
      section:[data.section],
      password:[data.password],
      checkPassword:[data.password],
      image:[data.image],
      level:[data.level],
      email:[data.email],
      className:["Client"]

     })
     resolve(this.userForm.value)
     console.log("line 60 :"+this.userForm.value.email);
  }).catch(err=>console.log(err))


 }

 onUpdateUserAccount(form:any){
   console.log("line 77 "+this.img);

 let f=form.value


let newData ={
  id:f.id[0],
  nom:f.fullName,
  section:f.section,
  password:f.password[0],
  image:f.image,
  level:f.level,
  email:f.email,
  role:f.className
}
console.log(JSON.stringify(newData));

// console.log("new data "+JSON.stringify(newData));

// this.http.put("http://localhost:3000/users/"+f.id,newData).pipe(catchError(this.errorHandler)).toPromise()
// .then((info)=>{
//   console.log("user updated correctly !!"+info);
//   this.userUpdated=true
// }).catch(err=>{console.log(err)
// })
this.userService.updateActeur(newData)

 }

 errorHandler(error:HttpErrorResponse){
   console.log("the error from update user is: "+JSON.stringify(throwError(error)));
   this.err=throwError(error)
   return throwError(error)
 }



}
