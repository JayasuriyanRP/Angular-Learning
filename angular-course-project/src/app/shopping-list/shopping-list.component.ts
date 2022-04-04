import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  notClicked: boolean = true;

  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getingredients();
    this.shoppingListService.ingredientChanged.subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
  }
}
