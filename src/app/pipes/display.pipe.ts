import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'display'
})
export class DisplayPipe implements PipeTransform {

  transform(value: string): string {

    value = value.replace('/', '÷');
    value = value.replace('*', '×');
    value = value.replace('-', '−');


    return value;
  }

}
