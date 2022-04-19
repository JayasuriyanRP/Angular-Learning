import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { PleaseSelectComponent } from './please-select/please-select.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipes.resolver';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoute {}
