import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArrayByPropertyValue'
})
export class FilterArrayByPropertyValuePipe implements PipeTransform {
  sanitizeString(str: string): string {
    return str.toLocaleLowerCase().trim().replace(/\s/g, '-');
  }

  transform<T>(items: T[] | null, key: keyof T, value: string): T[] | null {
    if (!items || !items.length) return [];
    if (!value || value === '') return items;
    //@ts-ignore
    return items.filter((item: T) => this.sanitizeString(item[key]) === this.sanitizeString(value));
  }
}
