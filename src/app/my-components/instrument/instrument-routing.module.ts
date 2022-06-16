import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageInstrumentComponent } from "./manage-instrument.component";

export const instrumentRoutes: Routes = [
  {
    path: 'manage-instrument', component: ManageInstrumentComponent, data: {
      label: 'Manage Instruments'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(instrumentRoutes)],
  exports: [RouterModule]
})
export class InstrumentRoutingModule { }
