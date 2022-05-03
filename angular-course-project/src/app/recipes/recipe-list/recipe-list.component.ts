import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { Recipe } from './recipe.model';
import { LoggingService } from '../../services/logging.service';
import { RecipesService } from '../recipies.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  providers: [LoggingService],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Output('onRecipeSelected') OnRecipeSelected = new EventEmitter<Recipe>();

  pageStatus = new Promise((resolver) => {
    setTimeout(() => {
      resolver('Loaded');
    }, 2000);
  });
  private recipeSubscription: Subscription;
  recipes: Recipe[] = [];
  constructor(
    private loggingService: LoggingService,
    private recipeService: RecipesService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {

    this.recipeSubscription = this.store.select('recipes').pipe(map(recipesState => recipesState.recipes)).subscribe(
      (recipes) => {
        //console.log('Change Called', recipes);
        this.recipes = recipes;
      }
    );
    //this.recipes = this.recipeService.Recipes;
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
