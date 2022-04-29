import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipies.service';
import { Recipe } from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  isEditMode: boolean = false;
  recipeForm: FormGroup;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      // console.log(id);
      this.isEditMode = this.id !== undefined && +this.id !== null;
      // console.log(this.isEditMode);
      this.initForm();
    });
  }

  onSubmit() {
    let recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imageURL'],
      this.recipeForm.value['ingredients'],
      new Date()
    );
    //console.log(recipe);
    //console.log(this.recipeForm.value);
    if (this.isEditMode) {
      this.recipesService.updateRecipe(+this.id, recipe);
    } else {
      this.recipesService.addRecipe(recipe);
    }
    //console.log(this.recipeForm);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onRemoveAllIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../ '], { relativeTo: this.route });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeInfo: Recipe = {
      name: '',
      description: '',
      imagePath: '',
      ingredients: [],
      createdDate: null,
    };
    let recipeIngredients = new FormArray([]);

    if (this.isEditMode) {
      const recipe = this.recipesService.getRecipe(+this.id);
      recipeInfo = recipe;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
      recipeIngredients;
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeInfo.name, Validators.required),
      imageURL: new FormControl(recipeInfo.imagePath, Validators.required),
      description: new FormControl(recipeInfo.description, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
