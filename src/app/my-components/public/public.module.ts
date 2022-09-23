import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module'
import { PublicRoutingModule } from "./public-routing.module";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";
import { EmailVerificationComponent } from "../email-verification/email-verification.component";
import { PasswordResetComponent } from "../password-reset/password-reset.component";



@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ],
  declarations: [LoginComponent,
    RegisterComponent,
    EmailVerificationComponent,
    PasswordResetComponent
  ]
})
export class PublicModule { }
