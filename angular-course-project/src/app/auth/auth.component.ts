import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app=auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin(authForm: NgForm) {
    this.isLoading = true;
    if (!this.isLoginMode) {
      this.authService
        .signUp(authForm.value.email, authForm.value.password)
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.router.navigate(['/recipes']);
            console.log(response);
          },
          (errorMessage) => {
            this.isLoading = false;
            this.error = errorMessage;
            console.log(errorMessage);
          }
        );
    } else {
      this.authService
        .logIn(authForm.value.email, authForm.value.password)
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.router.navigate(['/recipes']);
            console.log(response);
          },
          (errorMessage) => {
            this.isLoading = false;
            this.error = errorMessage;
            console.log(errorMessage);
          }
        );
    }
    authForm.reset();
  }
}
