import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./my-components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'instrument',
    loadChildren: () => import('./my-components/instrument/instrument.module').then(m => m.InstrumentModule)
  },
  {
    path: 'instrument-series',
    loadChildren: () => import('./my-components/instrument-series/instrument-series.module').then(m => m.InstrumentSeriesModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
