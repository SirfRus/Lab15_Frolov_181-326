import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { MyWorkerType, Workers } from 'src/app/services/workers';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css'],
})
export class TableWorkersComponent {
  
  @Input() title: string;
  @Input() spec: number;
  @Input() workers: Workers[];
  @Input() nameinp: string;
  @Input() surninp: string;
  
  @Output() editedWorker = new EventEmitter<Workers>();

  show: number;  
  type: number;
  myWorkerType = MyWorkerType;    
  phonemask = ['+', /[1-9]/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  myForm: FormGroup;
      
  ngOnInit(): void {
    setInterval( () => {
      if(this.dbs.checker) {
        this.dbs.getWorkers().subscribe (
          (response) => {            
            this.workers = response;
            this.workers = this.workers.filter((worker) => worker.type === this.spec);        
          }     
        ) 
      }
      
    }, 200)     
  } 
  constructor( private dbs: DbserviceService) {
    this.myForm = new FormGroup({
      "uName": new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9а-яА-Я]+$")]),
      "uSurname": new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9а-яА-Я]+$")]),
      "uPhone": new FormControl("", [Validators.required]),
      "uSpeciality": new FormControl(this.type),
    })
  }

  onDeleteWorker(id: number) {    
    this.dbs.delWorker(id);   
    this.dbs.getWorkers().subscribe (
      (response) => {            
        this.workers = response;
        this.workers = this.workers.filter((worker) => worker.type === this.spec);        
      }     
    )   
  }

  //Edit funcs
  editWorker(id: number) {        
    this.show = id;
    this.dbs.checker = false;
  }
  acceptEdit(id: number) {
    this.show = NaN;   
    this.dbs.modWorker(id, {           
      name: this.myForm.controls['uName'].value,
      surname: this.myForm.controls['uSurname'].value,
      phone: this.myForm.controls['uPhone'].value,
      type: this.myForm.controls['uSpeciality'].value,
      id: id
    })            
    this.dbs.checker = true;
  }    
}
