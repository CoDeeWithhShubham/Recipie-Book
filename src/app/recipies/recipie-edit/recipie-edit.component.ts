import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipieServise } from 'src/app/services/recipie.servise';

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrls: ['./recipie-edit.component.css']
})
export class RecipieEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipieForm: FormGroup;

  constructor(private route:ActivatedRoute,
              private recipieServise: RecipieServise,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id= +params['id'];
        this.editMode = params['id'] != null;
        // console.log(params);
        // console.log("hello");
        this.initRecipie();
      }
    )
  }
  private initRecipie(){
    let recipieName='';
    let recipieImgPath='';
    let recipieDescription='';
    let recipieIngredient = new FormArray([]);

    if(this.editMode){
      const recipie = this.recipieServise.getRecipies(this.id)
      recipieName = recipie.name;
      recipieImgPath = recipie.imgPath;
      recipieDescription = recipie.description;
      if(recipie['ingredients']){
        for (let ingredient of recipie.ingredients){
          recipieIngredient.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required,
                                                          Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
          }));
        }
      }
    }
    this.recipieForm = new FormGroup({
      'name': new FormControl(recipieName,Validators.required),
      'imgPath': new FormControl(recipieImgPath,Validators.required),
      'description': new FormControl(recipieDescription,Validators.required),
      'ingredients': recipieIngredient
    })
    console.log(recipieIngredient);
  }
  onSubmit(){
    if(this.editMode){
     this.recipieServise.updateRecipie(this.id, this.recipieForm.value);
     console.log(this.recipieServise);
    }else{
      this.recipieServise.addRecipie(this.recipieForm.value)
    }
    this.onCancelRecipie();
  }
  onAddIngredient(){
    (<FormArray>this.recipieForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
   onCancelRecipie(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  onDeleteIngredient(index:number){
    (<FormArray>this.recipieForm.get('ingredients')).removeAt(index);
  }
}
