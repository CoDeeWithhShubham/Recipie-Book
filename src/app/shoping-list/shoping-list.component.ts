import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListServise } from '../services/shopping-list.servise';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
  
})

export class ShopingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  constructor(private shoppingListServise: ShoppingListServise) { }
  ngOnInit(): void {      
    this.ingredients = this.shoppingListServise.getingredient();
   this.igChangeSub = this.shoppingListServise.ingredientChanged.
    subscribe(
      (ingredients: Ingredient[])=>{
        this.ingredients = ingredients
    })
  }
  onEditItem(index:number){
    this.shoppingListServise.startedEditing.next(index)
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();  
  }
} 



