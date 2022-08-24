import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module'
import { ManageUserComponent } from "./manage-user.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
  declarations: [
    ManageUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ],
})
export class UserModule { }

