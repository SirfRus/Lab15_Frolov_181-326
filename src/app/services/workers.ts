export class Workers {    
    name: string;
    surname: string;    
    type: number;
    phone: string;
    id?: number;
  
    constructor(id, name, surname, phone, type) {
      this.id = id;
      this.name = name;
      this.surname = surname;
      this.phone = phone;
      this.type = type;
    }
  
  }

  export enum MyWorkerType {
    programmer,
    designer,
    copywriter,
    manager,
  }