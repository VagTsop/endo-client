import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { ManageUserComponent } from "./manage-user.component";

export const userRoutes: Routes = [
  {
    path: 'manage-user', canActivate: [AuthenticationGuard], component: ManageUserComponent, data: {
      label: 'Manage Users',
      role: 'ROLE_ADMIN'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
