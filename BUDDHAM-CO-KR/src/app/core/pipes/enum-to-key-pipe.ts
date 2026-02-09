import { Pipe, PipeTransform } from '@angular/core';
import { MAINCATEGORY_OPTIONS } from '@app/core/enums/main-category-type';

@Pipe({
  name: 'enumToKey',
})
export class EnumToKeyPipe implements PipeTransform {

  // transform(value: any, enumType: any): string {
  //   if (value === null || value === undefined) {
  //     return '';
  //   }

  //   return enumType[value] || value.toString();

  // }
  transform(value: number, type: 'label' | 'displayText' = 'label'): string {
    if (value === null || value === undefined) {
      return '';
    }

    const option = MAINCATEGORY_OPTIONS.find(opt => opt.value === value);
    return option ? option[type] : value.toString();
  }

}
