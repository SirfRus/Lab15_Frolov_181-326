import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { MyWorkerType, MyWorker } from 'src/app/shared/worker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addform-worker',
  templateUrl: './addform-worker.component.html',
  styleUrls: ['./addform-worker.component.css'],
})

export class AddformWorkerComponent implements OnInit {
  
  ngOnInit(): void {}
  @Output() addWorker = new EventEmitter<MyWorker>();     

  myWorkerType = MyWorkerType;  
  type = 0;
  
  phonemask = ['+', /[1-9]/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  myForm: FormGroup;

  constructor() {

    this.myForm = new FormGroup({
      "uName": new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9а-яА-Я]+$")]),
      "uSurname": new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9а-яА-Я]+$")]),
      "uPhone": new FormControl("", [Validators.required]),
      "uSpeciality": new FormControl(this.type),
    })
  }
    
  onAddWorker() {    
    this.addWorker.emit({      
      name: this.myForm.controls['uName'].value,
      surname: this.myForm.controls['uSurname'].value,
      phone: this.myForm.controls['uPhone'].value,
      type: this.myForm.controls['uSpeciality'].value,
    });
  }
}