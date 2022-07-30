import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { LoginComponent } from "./my-components/login/login.component";
import { RegisterComponent } from "./my-components/register/register.component";


export const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'register', component: RegisterComponent,
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./my-components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'instrument',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./my-components/instrument/instrument.module').then(m => m.InstrumentModule)
  },
  {
    path: 'instrument-series',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./my-components/instrument-series/instrument-series.module').then(m => m.InstrumentSeriesModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {path: '**', redirectTo: '/login'},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
