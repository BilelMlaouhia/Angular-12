import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit , OnDestroy{



  constructor(private fb:FormBuilder) {
  
   }

   formGroupTry = this.fb.group({
     nom:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Z][a-z]{2,} *?$")]],
     prenom:[''],
     age:[0]
   })


  ngOnInit(): void {
   
      
   
  }

  


  ngOnDestroy(){

  }

}
