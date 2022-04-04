import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { LoggingService } from '../../services/logging.service';
import { RecipesService } from '../recipies.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  providers: [LoggingService],
})
export class RecipeListComponent implements OnInit {
  @Output('onRecipeSelected') OnRecipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [];
  constructor(
    private loggingService: LoggingService,
    private recipeService: RecipesService
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.Recipes;
  }
}
