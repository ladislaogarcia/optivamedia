import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractPropertyToValuesArray'
})
export class ExtractPropertyToValuesArrayPipe implements PipeTransform {
  transform<T>(items: T[] | null, key: keyof T): string[] {
    //@ts-ignore
    return [...new Set(items.map((item: T) => item[key]))];
  }
}
