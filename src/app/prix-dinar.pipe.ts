import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prixDinar'
})
export class PrixDinarPipe implements PipeTransform {

  transform(value: number): unknown {
    return (' '+value+',000 TND');
  }

}
