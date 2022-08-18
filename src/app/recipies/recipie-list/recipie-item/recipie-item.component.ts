import { Component, Input, OnInit } from '@angular/core';
import { RecipieServise } from 'src/app/services/recipie.servise';
import { Recipie } from '../../recipie.model';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrls: ['./recipie-item.component.css']
})
export class RecipieItemComponent implements OnInit {
@Input() recipie:Recipie;
@Input() index:number
  constructor(private recipieService: RecipieServise) { }

  ngOnInit(): void {
  }

}
