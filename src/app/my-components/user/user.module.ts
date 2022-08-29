import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module'
import { ManageUserComponent } from "./manage-user.component";
import { UserFormPopupComponent } from "./user-form-popup/user-form-popup.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
  declarations: [
    UserFormPopupComponent,
    ManageUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ],
})
export class UserModule { }

