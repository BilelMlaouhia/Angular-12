import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public userForm?:FormGroup
  // = this.formBuilder.group({
  //   id:[1],
  //   fullName:['user'],
  //   section:['Ti'],
  //   password:['la la'],
  //   image:['b.png'],
  //   level:[3],
  //   email:['user@user'],
  //   className:['Ti']

  //  })

  img:string=''
  currentUser:any
  newId:any
  allUsers:any
  userUpdated=false
  err:any

 constructor(private userService:UsersService, private http:HttpClient, private router:Router,
  private formBuilder:FormBuilder) {

    this.userService.getUserById().then((data)=>{
      this.getDataUser(data).then((d)=> console.log("current updateuser is : "+JSON.stringify(d))
      )

    })
  }

 ngOnInit(): void {

 }

 onGetImage(e:any){
 this.img=e.target.files[0].name


 }

 getDataUser(data:any){

  return new Promise((resolve,reject)=>{
    this.userForm= this.formBuilder.group({
      id:[data.id],
      fullName:[data.fullName],
      section:[data.section],
      password:[data.password],
      image:[data.image],
      level:[data.level],
      email:[data.email],
      className:[data.className]

     })
     resolve(this.userForm.value)
     console.log("line 60 :"+this.userForm.value.email);
  })


 }

 onUpdateUserAccount(form:any){
   console.log("line 77 "+this.img);

 let f=form.value
 if(this.img){f.image=this.img}

let newData ={
  id:f.id,
  fullName:f.fullName,
  section:f.section,
  password:f.password,
  image:f.image,
  level:f.level,
  email:f.email,
  className:f.className
}
// console.log("new data "+JSON.stringify(newData));

this.http.put("http://localhost:3000/users/"+f.id,newData).pipe(catchError(this.errorHandler)).toPromise()
.then((info)=>{
  console.log("user updated correctly !!"+info);
  this.userUpdated=true
}).catch(err=>{console.log(err)
})

 }

 errorHandler(error:HttpErrorResponse){
   console.log("the error from update user is: "+JSON.stringify(throwError(error)));
   this.err=throwError(error)
   return throwError(error)
 }



}
