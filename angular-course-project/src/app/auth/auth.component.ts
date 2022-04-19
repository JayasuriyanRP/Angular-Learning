import {
  Component,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { ViewChild, OnDestroy } from '@angular/core';
import { PlaceholderDirective } from '../directive/placeholder.directive';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app=auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  private alertSubscription: Subscription;

  @ViewChild(PlaceholderDirective, { static: false })
  placeHolder: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private viewContinerRef: ViewContainerRef
  ) {}

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
            this.showErrorAlert(errorMessage);
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
            this.showErrorAlert(errorMessage);
            console.log(errorMessage);
          }
        );
    }
    authForm.reset();
  }

  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

  private showErrorAlert(errorMessage: string) {
    const hostViewContainerRef = this.placeHolder.viewContainerRef;

    //const alertComponent = this.viewContinerRef.createComponent(AlertComponent);
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = errorMessage;
    this.alertSubscription = componentRef.instance.onCloseAlert.subscribe(
      () => {
        this.alertSubscription.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }
}
