import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { MyWorkerType, Workers } from 'src/app/services/workers';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DbserviceService } from 'src/app/services/dbservice.service';
@Component({
  selector: 'app-addform-worker',
  templateUrl: './addform-worker.component.html',
  styleUrls: ['./addform-worker.component.css'],
})

export class AddformWorkerComponent {
    
  @Output() addWorker = new EventEmitter<Workers>();       

  myWorkerType = MyWorkerType;  
  type = 0;  
  phonemask = ['+', /[1-9]/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  myForm: FormGroup;

  constructor( private dbs: DbserviceService) {
    this.myForm = new FormGroup({
      "uName": new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9а-яА-Я]+$")]),
      "uSurname": new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9а-яА-Я]+$")]),
      "uPhone": new FormControl("", [Validators.required]),
      "uSpeciality": new FormControl(this.type),
    })
  }
    
  onAddWorker() {            
    let workers: Workers[];
    let id;
    this.dbs.getWorkers().subscribe (
      (response) => {
        workers = response;
        id =
          workers.length > 0
          ? workers[workers.length - 1].id + 1
          : 0;                  
      }      
    )          
    this.dbs.addWorker({  
      id: id,    
      name: this.myForm.controls['uName'].value,
      surname: this.myForm.controls['uSurname'].value,
      phone: this.myForm.controls['uPhone'].value,
      type: this.myForm.controls['uSpeciality'].value,
    })      
  }    
}