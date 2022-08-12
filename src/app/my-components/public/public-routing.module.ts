import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmailVerificationComponent } from "../email-verification/email-verification.components.ts";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/verify/:code', component: EmailVerificationComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {

}
