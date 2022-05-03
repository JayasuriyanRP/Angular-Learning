import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe-list/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipesService } from './recipies.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesAction from './store/recipe.action';
import { Actions, ofType } from '@ngrx/effect';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipesService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions

  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    //console.log(route, state);
    return this.store.select('recipes').pipe(take(1), map(recipesState => {
      return recipesState.recipes;
    }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesAction.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesAction.SET_RECIPES),
            take(1));
        } else {
          return of(recipes);
        }
      }))

  }
}
