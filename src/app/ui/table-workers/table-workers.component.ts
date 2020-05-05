import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MyWorkerType, MyWorker } from 'src/app/shared/worker.model';

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
  name: string;
  surname: string;
  type: number;
  myWorkerType = MyWorkerType;

  @ViewChild('nameinput') nameinp: ElementRef;
  @ViewChild('surnameinput') surnameinp: ElementRef;  

  constructor() {}

  ngOnInit(): void {}

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }

  editWorker(id: number) {        
    this.show = id;
  }
  acceptEdit(id: number) {
    this.show = NaN;
    if(!this.nameinp.nativeElement.value.match(/^[a-zA-Z0-9а-яА-Я]+$/)) {
      this.nameinp.nativeElement.placeholder = 'Укажите имя';
      return
    }
    if(!this.surnameinp.nativeElement.value.match(/^[a-zA-Z0-9а-яА-Я]+$/)) {
      this.surnameinp.nativeElement.placeholder = 'Укажите фамилию';
      return
    }
    this.editedWorker.emit({     
      id: id,
      name: this.name,
      surname: this.surname,
      type: this.type,
    });    
  }
}
