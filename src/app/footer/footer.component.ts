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

   


  ngOnInit(): void {
   
      
   
  }

  


  ngOnDestroy(){

  }

}
