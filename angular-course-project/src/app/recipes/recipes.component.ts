import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { RecipesService } from './recipies.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipesService: RecipesService) {}
  ngOnInit(): void {
    this.recipesService.recipeSelected.subscribe((value) => {
      console.log(value);
      this.selectedRecipe = value;
    });
  }
}
