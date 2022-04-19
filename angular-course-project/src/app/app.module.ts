import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestDirectiveDirective } from './directive/test-directive.directive';
import { UnlessDirective } from './directive/unless.directive';
import { DropdownDirective } from './directive/dropdown.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoute as AppRouteModule } from './app-routing.module';
import { PleaseSelectComponent } from './please-select/please-select.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptor as AuthInterceptorService } from './auth/auth-intreceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './directive/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppinglistModule } from './shopping-list/shoppinglist.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    PleaseSelectComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    RecipesModule,
    ShoppinglistModule,
    AppRouteModule,
    HttpClientModule,
    SharedModule,
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
