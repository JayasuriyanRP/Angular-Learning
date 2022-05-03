import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe-list/recipe.model';
import * as RecipesAction from '../store/recipe.action';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RecipesAction from '../store/recipe.action';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
    fetchRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesAction.SET_RECIPES),
            switchMap(() => {
                return this.httpClient.get<Recipe[]>(
                    'https://recipebook-backend-app-default-rtdb.firebaseio.com/recipes.json'
                );
            }),
            map((response) => {
                return response.map((recipe) => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : [],
                    };
                });
            }),
            map(recipes => new RecipesAction.SetRecipes(recipes))
        );
    });

    storeRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesAction.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
                this.httpClient
                    .put(
                        'https://recipebook-backend-app-default-rtdb.firebaseio.com/recipes.json',
                        recipesState.recipes
                    )
            })
        )
    }, { dispatch: false })

    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromApp.AppState>) { }
}
