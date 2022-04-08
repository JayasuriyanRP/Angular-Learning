import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("form") userFormData: NgForm;
  user: { email: string; subscription: string };
  defaultSubscription: string = "pro";
  onSubmit() {
    console.log(this.userFormData);
    this.user = {
      email: this.userFormData.value.email,
      subscription: this.userFormData.value.dropdown,
    };
  }
}
