import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestDirectiveDirective } from './directive/test-directive.directive';
import { UnlessDirective } from './directive/unless.directive';
import { DropdownDirective } from './directive/dropdown.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { AppRoute as AppRouteModule } from './app-routing.module';
import { PleaseSelectComponent } from './please-select/please-select.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptor as AuthInterceptorService } from './auth/auth-intreceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './directive/placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    TestDirectiveDirective,
    UnlessDirective,
    DropdownDirective,
    NotFoundComponent,
    PleaseSelectComponent,
    RecipeEditComponent,
    ShortenPipe,
    FilterPipe,
    ReversePipe,
    AuthComponent,
    LoadingSpinner,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouteModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
