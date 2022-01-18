import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pcGamer } from '../pc.interface';
import { GestionService } from '../services/gestion.service';

@Component({
  selector: 'app-update-computer',
  templateUrl: './update-computer.component.html',
  styleUrls: ['./update-computer.component.scss']
})
export class UpdateComputerComponent implements OnInit {

  public selectedFile:any=null
  public fileImage:any=null
  public originalImage:any
  public computers:pcGamer[]=[]
  public newInformations?:pcGamer
  public newComputer?:pcGamer
  public need?:pcGamer
  public pcUpdated=false
  public currentId:any
  public updatedComputerVar?:pcGamer
  public hide_button=true


   constructor(private http:HttpClient,private gestion:GestionService,private ActiveRoute:ActivatedRoute,
     private formBuilder:FormBuilder, private router:Router) {

   this.ActiveRoute.queryParamMap.subscribe(parmas=>{
     console.log("from constructor active Route "+JSON.stringify(parmas));
        })
        console.log("before looking line 40 formgroup "+this.formGroupComputer.value.nom);


   this.currentId=this.gestion.computerIdNow



   }

   formGroupComputer:FormGroup = this.formBuilder.group({
     id:[0,Validators.required],
     nom:["",[Validators.required,Validators.minLength(3)]],
     prix:[0,[Validators.required]],
     quantity:[0,[Validators.required]],
     description:["",[Validators.required,Validators.minLength(20)]],
     image:["",Validators.required],
     userId:[0,Validators.required]
  })



   ngOnInit(): void {

    this.showPcId()
    this.onGetComputers().then(data=>{
      console.log("the data from updateComputer "+JSON.stringify(data));

      let d:any={}
      d=data
     this. formGroupComputer.setValue({
       id:d.id,
       nom:d.nom,
       prix:d.prix,
       quantity:d.quantity,
       description:d.description,
       image:d.image,
       userId:d.userId

     })
     })

   }

   getComputerById(data:any){
    let d=data

     this.formGroupComputer=this.formBuilder.group({
     id:[d.id],
     nom:[d.nom],
     prix:[d.prix],
     quantity:[d.quantity],
     description:[d.description],
     image:[d.image],
     userId:[d.userId]

  })}

   onGetComputers():Promise<pcGamer>{

       return new Promise((resolve,reject)=>{
        this.gestion.ongetComputers().subscribe(pc=>{
          this.computers=pc
          for(let i=0;i< this.computers.length;i++){
           if(this.computers[i].id==this.currentId) {
             this.need=this.computers[i]}

          }

         if(this.need)resolve(this.need)
         else reject('can not find item line 67 update computer .ts')
       })
       })


   }




   onUpdateComputer(){

     let url="http://localhost:3000/computers/"+this.formGroupComputer.value.id

        this.http.put(url,this.formGroupComputer.value).subscribe(data=>{
       console.log("updating done correctly "+data);
       this.pcUpdated=true
       setInterval(()=>{
        this.router.navigate(['/mycomputers'])
        },600)
       })


    }

   showPcId(){
     console.log("the current id from update.ts id= " +this.currentId);

   }




   deleteComputer(f:any){

     new Promise((resolve,reject)=>{
      let uri="http://localhost:3000/computers/"+f.id
      this.http.delete(uri).subscribe(done=>{
        console.log("item deleted succefully ");
        resolve("item deleted succefully")

      })
     }).then(()=>{
      this.router.navigateByUrl("/acceuil")
     }).catch(err=>console.log(err))
   }
   onDeleteItem(){
     this.hide_button=false
   }


  formName(d:string){
   return this.formGroupComputer.get(d)

  }
}
