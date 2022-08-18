import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipieServise } from 'src/app/services/recipie.servise';
import { ShoppingListServise } from 'src/app/services/shopping-list.servise';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipie } from '../recipie.model';

@Component({
  selector: 'app-recipie-details',
  templateUrl: './recipie-details.component.html',
  styleUrls: ['./recipie-details.component.css']
})
export class RecipieDetailsComponent implements OnInit {
 recipiee:Recipie;
 id:number;
  constructor(private recipieServise:RecipieServise,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
          this.id= +params['id']
          this.recipiee = this.recipieServise.getRecipies(this.id)
          // console.log(params)
      }
    )
  }
  addToShoppingList(){
   this.recipieServise.addIngredientToShoppingList(this.recipiee.ingredients) ;
  }
  onEditRecipie(){
    this.router.navigate(
      ['edit'],{relativeTo:this.route}
      // ['../', this.id, 'edit' ],{relativeTo:this.route} THIS IS ALSO SAME BUT IT IS MORE COMPLEX
    )
  }
  onDeleteRecipie(){
    this.recipieServise.onDelete(this.id)
  }
}
