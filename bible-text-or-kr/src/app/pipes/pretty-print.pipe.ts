import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyPrint',
  standalone: true
})
export class PrettyPrintPipe implements PipeTransform {

  transform(value: any): string {
    return JSON.stringify(value, null, 2);
  }

}
