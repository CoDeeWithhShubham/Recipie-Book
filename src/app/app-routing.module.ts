import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipieDetailsComponent } from "./recipies/recipie-details/recipie-details.component";
import { RecipieEditComponent } from "./recipies/recipie-edit/recipie-edit.component";
import { RecipieStartComponent } from "./recipies/recipie-start/recipie-start.component";
import { RecipiesComponent } from "./recipies/recipies.component";
import { ShopingListComponent } from "./shoping-list/shoping-list.component";
const appRoutes: Routes = [
    { path: '', redirectTo: '/recipies', pathMatch: 'full' },
    {
        path: 'recipies', component: RecipiesComponent, children: [
            { path: '', component: RecipieStartComponent },
            { path: 'new', component: RecipieEditComponent },
            { path: ':id', component: RecipieDetailsComponent },
            { path: ':id/edit', component: RecipieEditComponent },
        ]
    },
    { path: 'shopping-list', component: ShopingListComponent },
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}