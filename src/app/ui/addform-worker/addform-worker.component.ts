import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { MyWorkerType, MyWorker } from 'src/app/shared/worker.model';

@Component({
  selector: 'app-addform-worker',
  templateUrl: './addform-worker.component.html',
  styleUrls: ['./addform-worker.component.css'],
})
export class AddformWorkerComponent implements OnInit {
  myWorkerType = MyWorkerType;
  name: string;
  surname: string;
  type = 0;

  @Output() addWorker = new EventEmitter<MyWorker>();  

  @ViewChild('nameinput') nameinp: ElementRef;
  @ViewChild('surnameinput') surnameinp: ElementRef;  

  constructor() {}

  ngOnInit(): void {}

  //Отредактировано (невозможность добавить пустые записи);
  onAddWorker() {
    if(!this.nameinp.nativeElement.value.match(/^[a-zA-Z0-9а-яА-Я]+$/)) {
      this.nameinp.nativeElement.placeholder = 'Укажите имя';
      return
    }
    if(!this.surnameinp.nativeElement.value.match(/^[a-zA-Z0-9а-яА-Я]+$/)) {
      this.surnameinp.nativeElement.placeholder = 'Укажите фамилию';
      return
    }
    this.addWorker.emit({      
      name: this.name,
      surname: this.surname,
      type: this.type,
    });    
  }
}