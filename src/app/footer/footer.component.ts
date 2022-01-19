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


    tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipList = this.tooltipTriggerList.map((tooltipTriggerEl)=> {
     return Tooltip(tooltipTriggerEl)
   })

  ngOnInit(): void {



  }




  ngOnDestroy(){

  }

}
function Tooltip(tooltipTriggerEl: never): any {
  throw new Error('Function not implemented.');
}

