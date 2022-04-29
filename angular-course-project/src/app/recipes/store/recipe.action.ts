import { Action } from '@ngrx/store';
import { Recipe } from '../recipe-list/recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';

export class SetRecipes implements Action {
  type: string = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export type Actions = SetRecipes;
