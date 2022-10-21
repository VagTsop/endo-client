import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";

const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent, data: {
      label: 'Home',
      role: 'ROLE_ADMIN'
    }
  }

];
@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
