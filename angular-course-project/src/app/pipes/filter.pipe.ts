import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../recipes/recipe-list/recipe.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Recipe[], filterText: string, property: string): Recipe[] {
    if (value.length === 0 || filterText === '') {
      return value;
    } else {
      const resultArray: Recipe[] = [];

      for (const recipe of value) {
        if (recipe[property].includes(filterText)) {
          resultArray.push(recipe);
          let str: string = '';
        }
      }
      return resultArray;
    }
  }
}
