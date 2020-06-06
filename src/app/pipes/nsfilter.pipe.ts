import { Pipe, PipeTransform } from '@angular/core';
import { Workers } from 'src/app/services/workers';

@Pipe({
  name: 'nSfilter'
})
export class NSfilterPipe implements PipeTransform {

  transform(workers: Workers[], nameinp: string, surninp: string): any[] {
    if (nameinp === '' && surninp === '') return workers  
    else if(nameinp !== '' && surninp !== '') {
      let filt = workers.filter((worker) => worker.name.toLowerCase().indexOf(nameinp.toLowerCase()) !== -1 && worker.surname.toLowerCase().indexOf(surninp.toLowerCase()) !== -1);
      return filt
    }
    else if(nameinp !== '') {
      let nfilt = workers.filter((worker) => worker.name.toLowerCase().indexOf(nameinp.toLowerCase()) !== -1);
      return nfilt      
    }
    else {
      let sfilt = workers.filter((worker) => worker.surname.toLowerCase().indexOf(surninp.toLowerCase()) !== -1);
      return sfilt                  
    }    
  }
}
