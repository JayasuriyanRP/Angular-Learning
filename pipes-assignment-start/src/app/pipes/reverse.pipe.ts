import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverse",
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    if (value === "") {
      return value;
    } else {
      let charArray = value.split("");
      var reversedArray = charArray.reverse();
      var joinString = reversedArray.join("");
      return joinString;
    }
  }
}
