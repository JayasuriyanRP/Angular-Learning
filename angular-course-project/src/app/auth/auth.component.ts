import {
  Component,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { ViewChild, OnDestroy, OnInit } from '@angular/core';
import { PlaceholderDirective } from '../directive/placeholder.directive';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app=auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  private alertSubscription: Subscription;
  private storeSub: Subscription;

  @ViewChild(PlaceholderDirective, { static: false })
  placeHolder: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private viewContinerRef: ViewContainerRef,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      if (authState) {
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
      }
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin(authForm: NgForm) {
    this.isLoading = true;
    if (!this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.SignupStart({
          email: authForm.value.email,
          password: authForm.value.password,
        })
      );
    } else {
      //console.log(this.store);
      this.store.dispatch(
        new AuthActions.LoginStartAction({
          email: authForm.value.email,
          password: authForm.value.password,
        })
      );
    }
    authForm.reset();
  }

  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();  
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
