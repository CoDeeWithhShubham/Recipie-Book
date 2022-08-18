import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipieServise } from 'src/app/services/recipie.servise';
import { Recipie } from '../recipie.model';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css']
})
export class RecipieListComponent implements OnInit, OnDestroy {
  recipies: Recipie[];
  subscription: Subscription;
  constructor(private recipieServise: RecipieServise,
              private router:Router,
              private route:ActivatedRoute,
              ) { }
              
  ngOnInit(): void {
   this.subscription= this.recipieServise.recipieChange.subscribe(
      (recipie: Recipie[])=>{
        this.recipies = recipie;
      }
    )
    this.recipies = this.recipieServise.getRecipie();
  }
  onNewRecipie(){
    this.router.navigate(['new'], {relativeTo:this.route})
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}





