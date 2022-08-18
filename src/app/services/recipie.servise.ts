import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipie } from "../recipies/recipie.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListServise } from "./shopping-list.servise";

@Injectable()
export class RecipieServise {
   recipieChange= new Subject<Recipie[]>(); 
    private recipies: Recipie[] = [
        new Recipie('hello', 
        'kkk', 
        'https://image.shutterstock.com/image-photo/bangkok-thailand-june-9-2018-260nw-1108805654.jpg',[
            new Ingredient("burger",5),
            new Ingredient("pizza",1)
        ]),
        
        new Recipie('shubham', 'kumar', 'https://photo.foodgawker.com/wp-content/uploads/2017/06/3002026.jpg',[
            new Ingredient("chowmin",2),
            new Ingredient("dosa",1)
        ]),
        new Recipie('satyam', 'kumar', 'https://thumbs.dreamstime.com/b/chilli-chicken-plate-8401263.jpg',[
            new Ingredient("chapati",4),
            new Ingredient("chiken chilli",2)
        ]),
        new Recipie('choti', 'kumar', 'https://c.ndtvimg.com/2020-01/fprjo6do_fried-idli_625x300_08_January_20.jpg',[
            new Ingredient("idli",3),
            new Ingredient("pasta",1)
        ]),
    ];
    getRecipie() {
        return this.recipies.slice();
    }
    getRecipies(index:number){
        return this.recipies[index]
    }
    constructor(private slServise:ShoppingListServise){}

    addIngredientToShoppingList(ingredient: Ingredient[]){
        this.slServise.addingingredients(ingredient);
    }
    addRecipie(recipie: Recipie){
        this.recipies.push(recipie);
        this.recipieChange.next(this.recipies.slice());
    }
    updateRecipie(index:number, newRecipie: Recipie){
        this.recipies[index] = newRecipie;
        this.recipieChange.next(this.recipies.slice());
    }
    onDelete(index: number){
        this.recipies.splice(index,1);
        this.recipieChange.next(this.recipies.slice());
    }
}
