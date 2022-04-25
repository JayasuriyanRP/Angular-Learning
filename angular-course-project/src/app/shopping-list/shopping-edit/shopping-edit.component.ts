import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';

import { Ingredient } from '../../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../../shopping-list/store/shopping-list.action';
import * as fromShoppingList from './../store/shopping-list.reducer';
import { State } from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @ViewChild('f') shoppingListForm: NgForm;

  startEditingSubscription: Subscription;
  editMode = false;
  edittedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.startEditingSubscription = this.store
      .select('shoppingList')
      .subscribe((stateData: State) => {
        if (stateData.editedIngredientNumber > -1) {
          this.editMode = true;
          this.edittedItem = stateData.editedIngredient;

          this.shoppingListForm.setValue({
            name: stateData.editedIngredient.name,
            amount: stateData.editedIngredient.amount,
          });
        } else {
          this.editMode = false;
        }

        // this.editMode = true;
        // this.itemIndexToEdit = index;
        // this.edittedItem = this.shoppingListService.getIngredient(index);
        // this.shoppingListForm.setValue({
        //   name: this.edittedItem.name,
        //   amount: this.edittedItem.amount,
        // });
      });
  }

  onSubmit() {
    // const ingName = this.nameInputRef.nativeElement.value;
    // con st ingAmount = this.amountInputRef.nativeElement.value;

    let formValue = this.shoppingListForm.value;

    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    if (!this.editMode) {
      //this.shoppingListService.addNewIngredient(newIngredient);
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
    } else {
      // this.shoppingListService.updateIngredient(
      //   this.itemIndexToEdit,
      //   newIngredient
      // );
      this.store.dispatch(
        new ShoppingListAction.UpdateIngredient(newIngredient)
      );
    }
    this.resetForm();
  }

  onDelete() {
    //this.shoppingListService.removeIngredient(this.itemIndexToEdit);
    this.store.dispatch(new ShoppingListAction.DeleteIngredient());
    this.resetForm();
  }

  onReset() {
    this.resetForm();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  private resetForm() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  ngOnDestroy(): void {
    this.startEditingSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }
}
