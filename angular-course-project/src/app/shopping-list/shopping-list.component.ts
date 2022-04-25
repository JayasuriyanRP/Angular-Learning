import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';

import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject, Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListAction from './store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  notClicked: boolean = true;

  constructor(
    private shoppingListService: ShoppingListService,
    private shoppinglistStore: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.shoppinglistStore.select('shoppingList');
  }

  onEditItem(index: number) {
    //this.shoppingListService.startediting.next(index);
    this.shoppinglistStore.dispatch(new ShoppingListAction.StartEdit(index));
  }
}
