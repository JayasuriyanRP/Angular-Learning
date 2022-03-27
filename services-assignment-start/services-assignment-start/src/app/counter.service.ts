import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CounterService {
  initialCount = 0;
  constructor() {}
  addCount() {
    this.initialCount = this.initialCount + 1;
    console.log(this.initialCount);
  }
}
