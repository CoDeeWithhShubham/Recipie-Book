import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListServise } from 'src/app/services/shopping-list.servise';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') signUp: NgForm;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  private subscription: Subscription;
  constructor(private shoppinhListServise: ShoppingListServise) { }
  ngOnInit(): void {
    this.subscription = this.shoppinhListServise.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppinhListServise.getIngredients(index);
        this.signUp.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      })
  }
  onSubmit() {
    console.log('shubham')
    const ingName = this.signUp.value.name;
    const ingaAmount = this.signUp.value.amount;
    const newIngredient = new Ingredient(ingName, ingaAmount);
    // console.log(newIngredient);
    if (this.editMode) {
      this.shoppinhListServise.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      const hello = this.shoppinhListServise.addingingredient(newIngredient);
      // console.log(this.signUp.value)
    }
    this.signUp.reset();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  OnClear(){
    this.signUp.reset();
    this.editMode = false;
  }
  OnDelete(){
    this.shoppinhListServise.deleteIngredient(this.editedItemIndex);
    this.OnClear()
  }
}







