import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorComponent } from "./error.component";

const errorRoutes: Routes = [
  {
    path: 'notfound',
    component: ErrorComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(errorRoutes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule {

}
