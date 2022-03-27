import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public activeUsers = ["Max", "Anna"];
  public inactiveUsers = ["Chris", "Manu"];

  constructor(private counterService: CounterService) {}

  changeStatus(id: number, isActive: boolean) {
    if (isActive) {
      this.activeUsers.push(this.inactiveUsers[id]);
      this.inactiveUsers.splice(id, 1);
    } else {
      this.inactiveUsers.push(this.activeUsers[id]);
      this.activeUsers.splice(id, 1);
    }
    this.counterService.addCount();
  }
}
