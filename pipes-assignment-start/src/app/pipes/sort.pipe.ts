import { Pipe, PipeTransform } from "@angular/core";
import { Recipe } from "../../../../angular-course-project/src/app/recipes/recipe-list/recipe.model";

@Pipe({
  name: "sort",
})
export class SortPipe implements PipeTransform {
  transform(value: any, ascending: boolean): any {
    if (value.length === 0) {
      return value;
    } else {
      return value.sort((a, b) => {
        if (a.name > b.name) {
          return ascending ? 1 : -1;
        } else {
          return ascending ? -1 : 1;
        }
      });
    }
  }
}
