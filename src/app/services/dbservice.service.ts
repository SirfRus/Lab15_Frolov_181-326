import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Workers} from './workers';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DbserviceService {

  url: string = "http://localhost:3000/users";
  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) { 
    this.runDB();
  }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/users").
    subscribe((data) => console.log(data));        
  }  
 
  getWorkers(): Observable<Workers[]> {
    return this.http.get<Workers[]>(this.url)
  }  
  addWorker(worker: Workers) {
    return this.http.post<Workers>(this.url, worker).subscribe();
  }
  modWorker(id, worker: Workers) {
    return this.http.put(`${this.url}/${id}`, worker).subscribe();
  }
  delWorker(id) {
    return this.http.delete<void>(`${this.url}/${id}`).subscribe();
  }

  Db : Workers[];
  checker: boolean = true;

  runDB() {
    setInterval( () => {
      this.getWorkers().subscribe (
        (response) => {            
          this.Db = response;        
        }     
      )   
    }, 500);    
  }

}