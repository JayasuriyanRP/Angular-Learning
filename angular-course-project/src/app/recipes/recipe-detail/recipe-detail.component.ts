import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipesService } from '../recipies.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipesAction from './../store/recipe.action';
import * as ShoppingListAction from './../../shopping-list/store/shopping-list.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  recipe: Recipe;
  subscriptionOb: Subscription;
  id: number;

  constructor(
    private recipeService: RecipesService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    // this.activeRoute.params.subscribe((params) => {
    //   this.id = +params['id'];
    //   this.store.select('recipes').pipe(map(recipeState => {
    //     return recipeState.recipes.find((recipe, index) => {
    //       return index === this.id;
    //     })
    //   })).subscribe(recipe => {
    //     this.recipe = recipe;
    //   })
    //   //this.recipe = this.recipeService.getRecipe(this.id);
    // });

    this.activeRoute.params.pipe(map(params => +params['id']),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes');
      }),
      map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        })
      })).subscribe(recipe => {
        this.recipe = recipe;
      })

    let observableProp = new Observable<number>((observe) => {
      let i = 0;
      setInterval(() => {
        observe.next(i++);

        if (i == 6) {
          observe.error('Current value is ' + i);
        }
        if (i == 5) {
          observe.complete();
        }
      }, 1000);
    });

    this.subscriptionOb = observableProp.subscribe(
      (counter) => {
        console.log(counter);
      },
      (error) => console.log(error),
      () => {
        console.log('Completed!');
      }
    );
    // console.log(this.recipe);
  }

  ngAfterViewInit(): void {
    // console.log(this.recipe);
  }

  ngOnDestroy(): void {
    this.subscriptionOb.unsubscribe();
  }

  addToShoppingList() {
    this.store.dispatch(new ShoppingListAction.AddIngredients(this.recipe.ingredients));
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    //  this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesAction.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
