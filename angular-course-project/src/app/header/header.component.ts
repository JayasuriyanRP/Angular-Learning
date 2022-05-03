import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthAction from '../auth/store/auth.action';
import * as RecipesAction from '../recipes/store/recipe.action';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  authSubscription: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.store
      .select('auth')
      .pipe(map((authState) => authState?.user))
      .subscribe((user) => {
        console.log('Header', user);
        this.isAuthenticated = !!user;
      });
  }

  onSaveDataClicked() {
    this.store.dispatch(new RecipesAction.StoreRecipes());
    //this.dataStorage.storeRecipies();
  }
  onFetchDataClicked() {
    //this.dataStorage.fetchRecipies().subscribe();
    this.store.dispatch(new RecipesAction.FetchRecipes());
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthAction.LogoutAction());
  }
}
