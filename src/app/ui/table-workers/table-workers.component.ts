import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MyWorkerType, MyWorker } from 'src/app/shared/worker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css'],
})
export class TableWorkersComponent implements OnInit {
  @Input() title: string;
  @Input() workers: MyWorker[] = [];

  @Output() deleteWorker = new EventEmitter<number>(); 
  @Output() editedWorker = new EventEmitter<MyWorker>();

  show: number;  
  type: number;
  myWorkerType = MyWorkerType;  
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

  ngOnInit(): void {}

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }

  editWorker(id: number) {        
    this.show = id;
  }
  acceptEdit(id: number) {
    this.show = NaN;   
    this.editedWorker.emit({     
      id: id,
      name: this.myForm.controls['uName'].value,
      surname: this.myForm.controls['uSurname'].value,
      phone: this.myForm.controls['uPhone'].value,
      type: this.myForm.controls['uSpeciality'].value,
    });    
  }
}
