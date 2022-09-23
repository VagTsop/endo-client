import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmailVerificationComponent } from "../email-verification/email-verification.component";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";
import { PasswordResetComponent } from "../password-reset/password-reset.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/verify/:code', component: EmailVerificationComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {

}
