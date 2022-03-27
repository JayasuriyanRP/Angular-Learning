import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  displayDetails: boolean = false;
  logger = [];

  onDisplayDetailsClick() {
    this.displayDetails = !this.displayDetails;
    this.logger.push(new Date());
  }

  getCurrentLogColor(currentIndex: number) {
    return currentIndex >= 4 ? "blue" : "white";
  }
}
