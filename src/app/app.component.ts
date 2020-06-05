import { Component } from '@angular/core';
import { MyWorkerType } from './services/workers';
import { DbserviceService } from './services/dbservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  constructor(private dbs: DbserviceService) {}
  
  myWorkerType = MyWorkerType;       
 
  getByType(type: number) {                        
    return type;
  }     
}
