import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { Recipe } from './recipe-list/recipe.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../app/shopping-list/store/shopping-list.action';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromApp from './../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Test',
  //     'Testing new recipe',
  //     'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/sibyl_sunitha/Tamil_Nadu_Style_Dal_Masala_Vada_with_Cabbage_Recipe__.jpg',
  //     [
  //       new Ingredient('Jeera', 1),
  //       new Ingredient('Potato', 1),
  //       new Ingredient('Onion', 1),
  //       new Ingredient('Tomato', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Test 1',
  //     'This is a test recipe',
  //     'https://caitlinmarceau.com/wp-content/uploads/2019/10/top-12-dishes-of-tamil-nadu.jpg',
  //     [
  //       new Ingredient('Mutton', 1),
  //       new Ingredient('Ginger', 1),
  //       new Ingredient('Onion', 1),
  //       new Ingredient('Tomato', 1),
  //       new Ingredient('Sea weed', 1),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  get Recipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingridients: Ingredient[]) {
    //this.shoppingListService.addIngredients(ingridients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingridients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipies(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
