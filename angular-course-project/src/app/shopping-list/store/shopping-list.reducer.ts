import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/Ingredient.model';
import * as ShoppingListAction from './shopping-list.action';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientNumber: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('onion', 10),
    new Ingredient('tomato', 5),
    new Ingredient('garlic', 2),
  ],
  editedIngredient: null,
  editedIngredientNumber: -1,
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListAction.Actions
): State {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...(action.payload as Ingredient[]),
        ],
      };
    case ShoppingListAction.UPDATE_INGREDIENT:
      const payload = action.payload;

      const oldIngredient = state.ingredients[state.editedIngredientNumber];
      const updatedIngredient = {
        ...oldIngredient,
        ...payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientNumber] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientNumber: -1,
      };
    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, index) => {
          return index != state.editedIngredientNumber;
        }),
        editedIngredient: null,
        editedIngredientNumber: -1,
      };
    case ShoppingListAction.START_EDIT:
      return {
        ...state,
        editedIngredientNumber: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientNumber: -1,
      };
    default:
      return state;
  }
}
