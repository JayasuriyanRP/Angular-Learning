import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from '../recipes/recipies.service';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipesService
  ) {}

  storeRecipies() {
    const recipes = this.recipeService.Recipes;

    this.httpClient
      .put(
        'https://recipebook-backend-app-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipies() {
    return this.httpClient
      .get<Recipe[]>(
        'https://recipebook-backend-app-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((response) => {
          return response.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          console.log(recipes);
          this.recipeService.setRecipies(recipes);
        })
      );
  }
}
