import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pcGamer } from '../pc.interface';
import { GestionService } from '../services/gestion.service';

@Component({
  selector: 'app-add-pc',
  templateUrl: './add-pc.component.html',
  styleUrls: ['./add-pc.component.scss']
})
export class AddPcComponent implements OnInit  {

 public selectedFile:any=null
 public fileImage:any=null
 public originalImage:any
 public computer:pcGamer[]=[]
 public newInformations?:pcGamer
 public newComputer?:pcGamer
 public added=false
 public lastId:any

  constructor(private http:HttpClient,private gestion:GestionService,private router:Router) {
      this.onGetComputers().then(id=>console.log("the last id is: "+id)).catch(err=>console.log(err) )
  }

  ngOnInit(): void {
  }

  onGetComputers(){
   return new Promise((resolve,reject)=>{
    this.gestion.ongetComputers().subscribe(pc=>{
      this.computer=pc
    })
   this.lastId= this.computer[this.computer.length-1].id
   resolve(this.lastId)
   })
  }

  onGetImage(event:any) {
console.log(event);
this.selectedFile=event.target.files[0].name
this.fileImage=event.target.files[0]
console.log("from onGetImage method "+this.selectedFile);


  }



  onPostComputer(f:any){
    let userId = Number(localStorage.getItem('userId'))
    let formValues = f.value
    let prod={
      description:formValues.description,
      image:formValues.image,
      name:formValues.name,
      prix:formValues.price,
      quantity:formValues.quantity,
      num_imei:formValues.special,
      pross_pc:formValues.special,
      acteur_id:userId

    }
  //   let t="Mob"
  //   if(formValues.type.value=='Computer') t="Pc"
  // this.http.put("http://localhost:8082/produit/ajout"+t , prod).toPromise().then(data=>{
  //   console.log("done posting "+data);
  //   this.added=true

  // }).then(()=>{
  //   setInterval(()=>{
  //   this.router.navigateByUrl('/accueil')

  //   },1000)
  // }).catch(err=>err)
  console.log("valeur de type est: "+JSON.stringify(formValues));


    }







}
