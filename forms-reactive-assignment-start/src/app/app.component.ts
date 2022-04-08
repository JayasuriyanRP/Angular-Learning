import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormComponent } from "../../../basics-assignment-2-start/basics-assignment-2-start/src/app/form/form.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  projectDataForm: FormGroup;

  ngOnInit() {
    this.projectDataForm = new FormGroup({
      projectName: new FormControl(
        null,
        [
          Validators.required,
          // this.projectNameValidator,
        ],
        this.projectNameValidatorAsync
      ),
      projectEmail: new FormControl(null, [
        Validators.email,
        Validators.required,
      ]),
      projectStatus: new FormControl("stable"),
    });
  }

  onSubmit() {
    console.log(this.projectDataForm);
  }

  projectNameValidator(formControl: FormControl) {
    if (formControl.value === "Test") {
      return { nameIsForbidden: true };
    } else {
      return null;
    }
  }

  projectNameValidatorAsync(formcontrol: FormControl) {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (formcontrol.value.toLowerCase() === "test") {
          resolve({ projectNameIsInvalid: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
}
