import { Subject } from "rxjs";


import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListServise {
    ingredientChanged=new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Tomato', 12),
        new Ingredient('Aplle', 2),
        new Ingredient('mango', 3)
    ];
    getingredient() {
        return this.ingredients.slice();
    }
    getIngredients(index:number){
        return this.ingredients[index]
    }
    addingingredient(ingredient :Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice())
    }
    addingingredients(ingredients :Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice())

    }
    updateIngredient(index:number, newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice())
    }
    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}
