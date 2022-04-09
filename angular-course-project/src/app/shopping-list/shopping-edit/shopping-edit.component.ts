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
  itemIndexToEdit: number;
  edittedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.startEditingSubscription =
      this.shoppingListService.startediting.subscribe((index) => {
        this.editMode = true;
        this.itemIndexToEdit = index;
        this.edittedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount,
        });
      });
  }

  onSubmit() {
    // const ingName = this.nameInputRef.nativeElement.value;
    // con st ingAmount = this.amountInputRef.nativeElement.value;

    let formValue = this.shoppingListForm.value;

    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    if (!this.editMode) {
      this.shoppingListService.addNewIngredient(newIngredient);
    } else {
      this.shoppingListService.updateIngredient(
        this.itemIndexToEdit,
        newIngredient
      );
    }
    this.resetForm();
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.itemIndexToEdit);
    this.resetForm();
  }

  onReset() {
    this.resetForm();
  }

  private resetForm() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  ngOnDestroy(): void {
    this.startEditingSubscription.unsubscribe();
  }
}
