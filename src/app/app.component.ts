import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pcgamer';

  constructor(private http:HttpClient, private router:Router){
   
  }

 ngOnInit(): void {
     this.router.navigateByUrl('/logout').then(()=>{
       this.router.navigateByUrl('/acceuil')
     })
 }

}
