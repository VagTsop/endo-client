import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module'
import { ManageUserComponent } from "./manage-user.component";
import { UserDetailsPopupComponent } from "./user-details-popup/user-details-popup.component";
import { UserFormPopupComponent } from "./user-form-popup/user-form-popup.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
  declarations: [
    UserFormPopupComponent,
    UserDetailsPopupComponent,
    ManageUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ],
})
export class UserModule { }

