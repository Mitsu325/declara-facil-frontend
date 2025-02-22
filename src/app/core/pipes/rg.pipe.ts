import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rg',
  standalone: true,
})
export class RgPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '';

    let rg = value + '';
    rg = rg.replace(/[^a-zA-Z0-9]/g, '');

    if (rg.length < 7) {
      return rg;
    }

    return rg.replace(
      /([a-zA-Z]?)(\d{1,2})(\d{3})(\d{3})(\d?)/,
      '$1$2.$3.$4-$5'
    );
  }
}
