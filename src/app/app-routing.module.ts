import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { ErrorComponent } from "./error/error.component";

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./my-components/public/public.module').then(m => m.PublicModule)
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
  { path: '*', component: ErrorComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
