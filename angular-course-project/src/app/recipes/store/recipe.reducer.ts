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
    case RecipesAction.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload as Recipe]
      };
    case RecipesAction.UPDATE_RECIPE:
      const payload = action.payload as { index: number, recipe: Recipe }
      const updatedRecipe = {
        ...state.recipes[payload.index],
        ...payload.recipe
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipe[payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes

      };
    case RecipesAction.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipes, index) => {
          return index != action.payload;
        })
      }
    default:
      return state;
  }
}
