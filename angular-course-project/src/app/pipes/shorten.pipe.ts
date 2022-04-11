import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenPipe',
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: string) {
    if (value.length > limit) {
      return value.substring(0, limit) + ' ...';
    }
    return value;
  }
}
