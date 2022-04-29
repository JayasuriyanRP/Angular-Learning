import { Recipe } from '../recipe-list/recipe.model';
import * as RecipesAction from './recipe.action';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipesReducer(
  state = initialState,
  action: RecipesAction.Actions
): State {
  switch (action.type) {
    case RecipesAction.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    default:
      return state;
  }
}
